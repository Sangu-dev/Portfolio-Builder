# Development Guide

## 🚀 Quick Start

### Initial Setup

1. **Install all dependencies**:
   ```bash
   npm run install:all
   ```

   Or install individually:
   ```bash
   # Root dependencies
   npm install

   # Client dependencies
   cd client && npm install

   # Server dependencies
   cd server && npm install
   ```

### Running the Application

You'll need **two terminal windows** to run both the client and server:

**Terminal 1 - Server** (runs on port 5000):
```bash
npm run dev:server
# Or: cd server && npm start
```

**Terminal 2 - Client** (runs on port 5173):
```bash
npm run dev:client
# Or: cd client && npm run dev
```

Once both are running:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
Portfolio-Builder/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ProfileForm.jsx
│   │   │   └── TemplatePicker.jsx
│   │   ├── app.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── styles.css     # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                # Express Backend
│   ├── templates/         # Portfolio templates
│   │   ├── template--simple/
│   │   ├── template--modern/
│   │   └── template--classic/
│   ├── tmp/              # Generated portfolios (auto-created)
│   ├── index.js          # Main server file
│   └── package.json
│
└── package.json          # Root scripts
```

## 🎨 Templates

The project includes three portfolio templates:

1. **Simple One-Page** - Clean, single-column layout
2. **Modern Sidebar** - Sleek two-column with gradient accents
3. **Classic Professional** - Traditional elegant design

### Creating a New Template

1. Create a new folder in `server/templates/`:
   ```bash
   mkdir server/templates/template--mytemplate
   mkdir server/templates/template--mytemplate/assets
   ```

2. Add required files:
   - `index.hbs` - Handlebars template with HTML structure
   - `assets/style.css` - Template-specific styles
   - `meta.json` - Template metadata

3. Example `meta.json`:
   ```json
   {
     "id": "template-mytemplate",
     "name": "My Template",
     "description": "Brief description",
     "thumbnail": "/templates/template-mytemplate/thumbnail.png"
   }
   ```

4. Available Handlebars variables:
   - `{{name}}` - User's name
   - `{{role}}` - User's role/title
   - `{{bio}}` - User's bio
   - `{{skills}}` - Array of skills
   - `{{projects}}` - Array of project objects
   - `{{contact.email}}` - Contact email
   - `{{contact.linkedin}}` - LinkedIn URL

## 🔧 Configuration

### Environment Variables

**Client** (`.env` in `client/` directory):
```env
VITE_API_BASE=http://localhost:5000
```

**Server** (`.env` in `server/` directory):
```env
PORT=5000
NODE_ENV=development
```

## 📝 API Endpoints

### GET `/api/templates`
Returns list of available templates.

**Response:**
```json
[
  {
    "id": "template-simple",
    "name": "Simple One-Page",
    "description": "Clean, single-column portfolio",
    "thumbnail": "/templates/template-simple/thumbnail.png"
  }
]
```

### POST `/api/generate`
Generates and downloads portfolio as ZIP.

**Request Body:**
```json
{
  "templateId": "template-simple",
  "profile": {
    "name": "John Doe",
    "role": "Full Stack Developer",
    "bio": "...",
    "skills": ["React", "Node.js"],
    "projects": [
      {
        "title": "Project Name",
        "description": "Project description",
        "link": "https://..."
      }
    ],
    "contact": {
      "email": "john@example.com",
      "linkedin": "https://linkedin.com/in/johndoe"
    }
  }
}
```

**Response:** ZIP file download

## 🏗️ Building for Production

Build the client:
```bash
npm run build
# Or: cd client && npm run build
```

The built files will be in `client/dist/`.

## 🐛 Common Issues

### Port Already in Use
If port 5000 or 5173 is already in use:
- Change `PORT` in server `.env`
- Change `server.port` in `client/vite.config.js`

### Module Not Found Errors
Make sure all dependencies are installed:
```bash
npm run install:all
```

### Templates Not Loading
- Check that templates have proper folder structure
- Verify `meta.json` exists and is valid JSON
- Ensure `index.hbs` exists in template folder

## 📦 Dependencies

### Client
- React 18.2.0
- Vite 5.0.0
- @vitejs/plugin-react

### Server
- Express 4.18.2
- Handlebars 4.7.7
- Archiver 5.3.1
- Multer 1.4.5
- fs-extra 11.1.1
- uuid 9.0.0
- cors 2.8.5

## 🤝 Contributing

1. Make your changes
2. Test thoroughly
3. Update README if needed
4. Commit with clear message
5. Push to repository

## 📄 License

ISC
