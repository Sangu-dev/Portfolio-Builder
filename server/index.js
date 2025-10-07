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

app.use(cors());
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '8mb' }));

// Serve static template folders so client can fetch thumbnails / previews
app.use('/templates', express.static(TEMPLATES_DIR));

// Helper: list templates (reads meta.json in each template folder)
async function listTemplates() {
  const ids = await fs.readdir(TEMPLATES_DIR);
  const templates = [];
  for (const id of ids) {
    const p = path.join(TEMPLATES_DIR, id);
    const stat = await fs.stat(p);
    if (!stat.isDirectory()) continue;
    const metaPath = path.join(p, 'meta.json');
    let meta = { id, name: id, description: '', thumbnail: /templates/${id}/thumbnail.png };
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
    if (!templateId || !profile) return res.status(400).json({ error: 'templateId and profile are required' });

    const templatePath = path.join(TEMPLATES_DIR, templateId);
    if (!(await fs.pathExists(templatePath))) return res.status(404).json({ error: 'template not found' });

    // create a temporary output directory per request
    const outId = uuidv4();
    const outDir = path.join(TMP_DIR, outId);
    await fs.ensureDir(outDir);

    // copy static assets if present
    const assetsSrc = path.join(templatePath, 'assets');
    if (await fs.pathExists(assetsSrc)) {
      await fs.copy(assetsSrc, path.join(outDir, 'assets'));
    }

    // compile Handlebars template (index.hbs)
    const templateFile = path.join(templatePath, 'index.hbs');
    if (!(await fs.pathExists(templateFile))) {
      await fs.remove(outDir);
      return res.status(500).json({ error: 'template is missing index.hbs' });
    }

    const raw = await fs.readFile(templateFile, 'utf8');
    const template = Handlebars.compile(raw);

    // simple sanitization: ensure strings exist
    const safeProfile = profile || {};

    const rendered = template(safeProfile);
    await fs.writeFile(path.join(outDir, 'index.html'), rendered, 'utf8');

    // create ZIP and stream to response
    res.setHeader('Content-Type', 'application/zip');
    const fileNameSafe = (profile.name || 'portfolio').replace(/[^a-z0-9.-]/gi, '');
    res.setHeader('Content-Disposition', attachment; filename="${fileNameSafe}.zip"\);

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', err => { throw err; });
    archive.pipe(res);
    archive.directory(outDir, false);
    archive.finalize();

    // cleanup after a small timeout to ensure streaming finished
    setTimeout(() => fs.remove(outDir).catch(() => {}), 30 * 1000);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

app.listen(PORT, () => console.log(Server running on http://localhost:${PORT}));