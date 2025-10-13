// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 5000;
const app = express();

const ROOT = path.resolve(__dirname);
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const TMP_DIR = path.join(ROOT, 'tmp');

// Security: Add helmet-like headers (but allow framing for previews)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Allow framing for preview functionality - don't set X-Frame-Options for previews
  if (!req.path.startsWith('/api/preview')) {
    res.setHeader('X-Frame-Options', 'DENY');
  }
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(cors());
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '8mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Serve static template folders so client can fetch thumbnails / previews
app.use('/templates', express.static(TEMPLATES_DIR));

// Validation helpers
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim().slice(0, 1000); // Limit length
}

function validateProfile(profile) {
  const errors = [];
  
  if (!profile || typeof profile !== 'object') {
    errors.push('Invalid profile data');
    return { isValid: false, errors };
  }
  
  if (!profile.name || typeof profile.name !== 'string' || profile.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!profile.role || typeof profile.role !== 'string' || profile.role.trim().length === 0) {
    errors.push('Role is required');
  }
  
  // Validate arrays
  if (profile.skills && !Array.isArray(profile.skills)) {
    errors.push('Skills must be an array');
  }
  
  if (profile.projects && !Array.isArray(profile.projects)) {
    errors.push('Projects must be an array');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function sanitizeProfile(profile) {
  return {
    name: sanitizeString(profile.name || ''),
    role: sanitizeString(profile.role || ''),
    bio: sanitizeString(profile.bio || ''),
    profileImage: profile.profileImage || '', // Keep base64 image as-is
    skills: Array.isArray(profile.skills) 
      ? profile.skills.map(s => sanitizeString(s)).filter(Boolean).slice(0, 20)
      : [],
    projects: Array.isArray(profile.projects)
      ? profile.projects.map(p => ({
          title: sanitizeString(p.title || ''),
          description: sanitizeString(p.description || ''),
          link: sanitizeString(p.link || '')
        })).slice(0, 10)
      : [],
    contact: {
      email: sanitizeString(profile.contact?.email || ''),
      linkedin: sanitizeString(profile.contact?.linkedin || '')
    }
  };
}

// Helper: list templates (reads meta.json in each template folder)
async function listTemplates() {
  const ids = await fs.readdir(TEMPLATES_DIR);
  const templates = [];
  for (const id of ids) {
    const p = path.join(TEMPLATES_DIR, id);
    const stat = await fs.stat(p);
    if (!stat.isDirectory()) continue;
    const metaPath = path.join(p, 'meta.json');
    let meta = { id, name: id, description: '', thumbnail: `/templates/${id}/thumbnail.png` };
    if (await fs.pathExists(metaPath)) {
      try { meta = { id, ...(await fs.readJson(metaPath)) }; } catch (e) { /* ignore */ }
    }
    templates.push(meta);
  }
  return templates;
}

// GET /api/templates -> returns array of template metadata
app.get('/api/templates', async (req, res) => {
  const templates = await listTemplates();
  res.json(templates);
});

// POST /api/generate -> expects { templateId, profile }
app.post('/api/generate', async (req, res) => {
  try {
    const { templateId, profile } = req.body;
    
    // Validate input
    if (!templateId || typeof templateId !== 'string') {
      return res.status(400).json({ error: 'Valid templateId is required' });
    }
    
    if (!profile) {
      return res.status(400).json({ error: 'Profile data is required' });
    }
    
    // Validate profile
    const validation = validateProfile(profile);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Invalid profile data', 
        details: validation.errors 
      });
    }
    
    // Sanitize template ID to prevent directory traversal
    const safeTemplateId = templateId.replace(/[^a-z0-9_-]/gi, '');
    const templatePath = path.join(TEMPLATES_DIR, safeTemplateId);
    
    if (!(await fs.pathExists(templatePath))) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // create a temporary output directory per request
    const outId = uuidv4();
    const outDir = path.join(TMP_DIR, outId);
    await fs.ensureDir(outDir);

    try {
      // copy static assets if present
      const assetsSrc = path.join(templatePath, 'assets');
      if (await fs.pathExists(assetsSrc)) {
        await fs.copy(assetsSrc, path.join(outDir, 'assets'));
      }

      // compile Handlebars template (index.hbs)
      const templateFile = path.join(templatePath, 'index.hbs');
      if (!(await fs.pathExists(templateFile))) {
        throw new Error('Template is missing index.hbs');
      }

      const raw = await fs.readFile(templateFile, 'utf8');
      const template = Handlebars.compile(raw);

      // Sanitize profile data
      const safeProfile = sanitizeProfile(profile);

      const rendered = template(safeProfile);
      await fs.writeFile(path.join(outDir, 'index.html'), rendered, 'utf8');

      // create ZIP and stream to response
      res.setHeader('Content-Type', 'application/zip');
      const fileNameSafe = (profile.name || 'portfolio').replace(/[^a-z0-9._-]/gi, '_');
      res.setHeader('Content-Disposition', `attachment; filename="${fileNameSafe}.zip"`);

      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.on('error', err => { throw err; });
      archive.pipe(res);
      archive.directory(outDir, false);
      await archive.finalize();

      // cleanup after streaming finished
      setTimeout(() => fs.remove(outDir).catch(err => {
        console.error('Cleanup error:', err);
      }), 30 * 1000);
    } catch (innerErr) {
      // Cleanup on error
      await fs.remove(outDir).catch(() => {});
      throw innerErr;
    }
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// GET /api/preview/:id -> serves preview HTML
app.get('/api/preview/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const previewPath = path.join(TMP_DIR, id, 'index.html');
    
    if (!(await fs.pathExists(previewPath))) {
      return res.status(404).send('Preview not found or expired');
    }
    
    res.sendFile(previewPath);
  } catch (err) {
    console.error('Preview error:', err);
    res.status(500).send('Error loading preview');
  }
});

// Serve preview assets with correct paths and MIME types
app.get('/api/preview/:id/assets/*', (req, res) => {
  const { id } = req.params;
  const assetPath = req.params[0];
  const fullPath = path.join(TMP_DIR, id, 'assets', assetPath);
  
  if (!fs.existsSync(fullPath)) {
    return res.status(404).send('Asset not found');
  }
  
  // Set correct MIME type based on file extension
  const ext = path.extname(assetPath).toLowerCase();
  const mimeTypes = {
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
  };
  
  if (mimeTypes[ext]) {
    res.setHeader('Content-Type', mimeTypes[ext]);
  }
  
  res.sendFile(fullPath);
});

// POST /api/generate-preview -> generates preview without downloading
app.post('/api/generate-preview', async (req, res) => {
  try {
    const { templateId, profile } = req.body;
    
    // Validate input
    if (!templateId || typeof templateId !== 'string') {
      return res.status(400).json({ error: 'Valid templateId is required' });
    }
    
    if (!profile) {
      return res.status(400).json({ error: 'Profile data is required' });
    }
    
    // Validate profile
    const validation = validateProfile(profile);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Invalid profile data', 
        details: validation.errors 
      });
    }
    
    // Sanitize template ID
    const safeTemplateId = templateId.replace(/[^a-z0-9_-]/gi, '');
    const templatePath = path.join(TEMPLATES_DIR, safeTemplateId);
    
    if (!(await fs.pathExists(templatePath))) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Create temporary output directory
    const outId = uuidv4();
    const outDir = path.join(TMP_DIR, outId);
    await fs.ensureDir(outDir);

    try {
      // Copy static assets
      const assetsSrc = path.join(templatePath, 'assets');
      if (await fs.pathExists(assetsSrc)) {
        await fs.copy(assetsSrc, path.join(outDir, 'assets'));
      }

      // Compile template
      const templateFile = path.join(templatePath, 'index.hbs');
      if (!(await fs.pathExists(templateFile))) {
        throw new Error('Template is missing index.hbs');
      }

      const raw = await fs.readFile(templateFile, 'utf8');
      const template = Handlebars.compile(raw);
      const safeProfile = sanitizeProfile(profile);
      let rendered = template(safeProfile);
      
      // Rewrite asset paths for preview
      rendered = rendered.replace(/href="assets\//g, `href="/api/preview/${outId}/assets/`);
      rendered = rendered.replace(/src="assets\//g, `src="/api/preview/${outId}/assets/`);
      
      await fs.writeFile(path.join(outDir, 'index.html'), rendered, 'utf8');

      // Return preview URL
      res.json({ 
        previewId: outId,
        previewUrl: `/api/preview/${outId}`
      });

      // Cleanup after 10 minutes
      setTimeout(() => fs.remove(outDir).catch(err => {
        console.error('Preview cleanup error:', err);
      }), 10 * 60 * 1000);
    } catch (innerErr) {
      await fs.remove(outDir).catch(() => {});
      throw innerErr;
    }
  } catch (err) {
    console.error('Preview generation error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
