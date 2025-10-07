# API Documentation

This document describes all the API endpoints available in the Portfolio Builder backend.

## Base URL

```
http://localhost:5000
```

## Endpoints

### 1. Get Templates List

Retrieves a list of all available portfolio templates.

**Endpoint**: `GET /api/templates`

**Request**: No parameters required

**Response**: `200 OK`

```json
[
  {
    "id": "template--simple",
    "name": "Simple One-Page",
    "description": "Clean, single-column portfolio",
    "thumbnail": "/templates/template--simple/thumbnail.png"
  },
  {
    "id": "template--modern",
    "name": "Modern Sidebar",
    "description": "Sleek two-column layout with gradient accents",
    "thumbnail": "/templates/template--modern/thumbnail.png"
  },
  {
    "id": "template--classic",
    "name": "Classic Professional",
    "description": "Traditional elegant design with serif typography",
    "thumbnail": "/templates/template--classic/thumbnail.png"
  }
]
```

**Error Responses**:
- `500 Internal Server Error` - Server error

---

### 2. Generate Portfolio

Generates a portfolio website based on the selected template and user profile data. Returns a ZIP file download.

**Endpoint**: `POST /api/generate`

**Headers**:
```
Content-Type: application/json
```

**Request Body**:

```json
{
  "templateId": "template--modern",
  "profile": {
    "name": "John Doe",
    "role": "Full Stack Developer",
    "bio": "Passionate developer with 5 years of experience building web applications...",
    "skills": [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL"
    ],
    "projects": [
      {
        "title": "E-commerce Platform",
        "description": "Built a full-featured e-commerce platform with payment integration",
        "link": "https://github.com/johndoe/ecommerce"
      },
      {
        "title": "Task Management App",
        "description": "Real-time collaborative task management application",
        "link": "https://taskapp.com"
      }
    ],
    "contact": {
      "email": "john.doe@example.com",
      "linkedin": "https://linkedin.com/in/johndoe"
    }
  }
}
```

**Field Descriptions**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `templateId` | string | Yes | ID of the template to use (from `/api/templates`) |
| `profile.name` | string | Yes | User's full name |
| `profile.role` | string | No | Professional title or role |
| `profile.bio` | string | No | Biography or about section |
| `profile.skills` | array | No | Array of skill strings |
| `profile.projects` | array | No | Array of project objects |
| `profile.projects[].title` | string | Yes | Project title |
| `profile.projects[].description` | string | No | Project description |
| `profile.projects[].link` | string | No | Project URL |
| `profile.contact.email` | string | No | Contact email address |
| `profile.contact.linkedin` | string | No | LinkedIn profile URL |

**Response**: `200 OK`

- **Content-Type**: `application/zip`
- **Content-Disposition**: `attachment; filename="{name}.zip"`
- **Body**: Binary ZIP file containing:
  - `index.html` - Generated portfolio HTML
  - `assets/style.css` - Template-specific styles
  - Other template assets (if any)

**Error Responses**:

- `400 Bad Request`
  ```json
  {
    "error": "templateId and profile are required"
  }
  ```

- `404 Not Found`
  ```json
  {
    "error": "template not found"
  }
  ```

- `500 Internal Server Error`
  ```json
  {
    "error": "template is missing index.hbs"
  }
  ```
  or
  ```json
  {
    "error": "internal error"
  }
  ```

---

### 3. Static Template Assets

Serves static files from template directories (thumbnails, etc.).

**Endpoint**: `GET /templates/{templateId}/{filename}`

**Example**:
```
GET /templates/template--modern/thumbnail.png
```

**Response**: Static file (image, CSS, etc.)

---

## Example Usage

### JavaScript/Fetch

```javascript
// Get templates
const templates = await fetch('http://localhost:5000/api/templates')
  .then(res => res.json());

console.log(templates);

// Generate portfolio
const response = await fetch('http://localhost:5000/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    templateId: 'template--modern',
    profile: {
      name: 'Jane Smith',
      role: 'Software Engineer',
      bio: 'Building awesome things...',
      skills: ['React', 'TypeScript', 'Node.js'],
      projects: [{
        title: 'My Project',
        description: 'A cool project',
        link: 'https://example.com'
      }],
      contact: {
        email: 'jane@example.com',
        linkedin: 'https://linkedin.com/in/janesmith'
      }
    }
  })
});

// Download the ZIP file
const blob = await response.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'portfolio.zip';
a.click();
URL.revokeObjectURL(url);
```

### cURL

```bash
# Get templates
curl http://localhost:5000/api/templates

# Generate portfolio
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "template--simple",
    "profile": {
      "name": "John Doe",
      "role": "Developer",
      "bio": "Hello world",
      "skills": ["JavaScript"],
      "projects": [],
      "contact": {
        "email": "john@example.com"
      }
    }
  }' \
  --output portfolio.zip
```

---

## Rate Limiting

Currently, there are no rate limits implemented. 

## CORS

CORS is enabled for all origins in development mode.

## Error Handling

All errors return JSON with an `error` field:

```json
{
  "error": "Error message describing what went wrong"
}
```

## Server Configuration

Default configuration:
- **Port**: 5000 (configurable via `PORT` environment variable)
- **Temp Directory**: `server/tmp/` (auto-created)
- **Templates Directory**: `server/templates/`
- **Request Size Limit**: 8mb

---

**Last Updated**: 2025-10-07
