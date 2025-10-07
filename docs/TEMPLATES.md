# Portfolio Templates Guide

This guide explains the available portfolio templates and how to create custom ones.

## Available Templates

Portfolio Builder includes three professionally designed templates:

### 1. Simple One-Page

**ID**: `template--simple`  
**Best For**: Quick portfolios, minimalists, beginners

**Features**:
- Clean, single-column layout
- Minimal design with essential information
- Fast loading
- Easy to read
- Perfect for straightforward portfolios

**Design Elements**:
- System fonts for maximum compatibility
- Light background with subtle borders
- Flexible skill tags
- Card-based project layout

---

### 2. Modern Sidebar ⭐

**ID**: `template--modern`  
**Best For**: Developers, designers, creative professionals

**Features**:
- Sleek two-column layout
- Dark sidebar with light content area
- Gradient color scheme (purple to violet)
- Professional and eye-catching
- Fully responsive

**Design Elements**:
- Dark sidebar (gradient: #1a1a2e to #16213e)
- Gradient accents (#667eea to #764ba2)
- Emoji icons for contact links
- Hover effects on skills and projects
- Shadow effects for depth

**Color Palette**:
- Primary: #667eea (blue-purple)
- Secondary: #764ba2 (violet)
- Dark: #1a1a2e
- Accent: #64ffda (cyan)

---

### 3. Classic Professional ⭐

**ID**: `template--classic`  
**Best For**: Corporate professionals, academics, formal portfolios

**Features**:
- Traditional centered layout
- Serif typography for sophistication
- Clean and elegant design
- Professional appearance
- Business-appropriate

**Design Elements**:
- Georgia serif font for headings
- Dark header (#2c3e50)
- Decorative section dividers
- Project list with left borders
- Minimalist footer

**Color Palette**:
- Primary: #2c3e50 (dark blue-gray)
- Secondary: #34495e (medium gray)
- Background: #f9f7f4 (off-white)
- Text: #2c2c2c

---

## Template Structure

Each template consists of three main files:

```
template--name/
├── index.hbs           # Handlebars template (HTML structure)
├── meta.json          # Template metadata
└── assets/
    └── style.css      # Template-specific styles
```

### 1. index.hbs

The main HTML template using Handlebars syntax.

**Available Variables**:

| Variable | Type | Description |
|----------|------|-------------|
| `{{name}}` | string | User's full name |
| `{{role}}` | string | Professional title/role |
| `{{bio}}` | string | Biography/about text |
| `{{skills}}` | array | Array of skill strings |
| `{{projects}}` | array | Array of project objects |
| `{{projects.[].title}}` | string | Project title |
| `{{projects.[].description}}` | string | Project description |
| `{{projects.[].link}}` | string | Project URL |
| `{{contact.email}}` | string | Email address |
| `{{contact.linkedin}}` | string | LinkedIn URL |

**Handlebars Helpers**:

```handlebars
{{! Conditional rendering }}
{{#if skills}}
  <ul>
    {{#each skills}}
      <li>{{this}}</li>
    {{/each}}
  </ul>
{{/if}}

{{! Loops }}
{{#each projects}}
  <h3>{{title}}</h3>
  <p>{{description}}</p>
{{/each}}
```

### 2. meta.json

Template metadata file.

```json
{
  "id": "template--name",
  "name": "Display Name",
  "description": "Brief description of the template",
  "thumbnail": "/templates/template--name/thumbnail.png"
}
```

**Fields**:
- `id`: Must match the folder name
- `name`: User-friendly name shown in UI
- `description`: Short description
- `thumbnail`: Path to preview image (optional)

### 3. assets/style.css

Template-specific CSS styles.

**Best Practices**:
- Use relative paths for assets
- Keep styles scoped to avoid conflicts
- Include responsive design (@media queries)
- Test across different browsers

---

## Creating a Custom Template

### Step 1: Create Template Folder

```bash
cd server/templates
mkdir template--mytemplate
mkdir template--mytemplate/assets
```

### Step 2: Create meta.json

```json
{
  "id": "template--mytemplate",
  "name": "My Custom Template",
  "description": "A custom portfolio template",
  "thumbnail": "/templates/template--mytemplate/thumbnail.png"
}
```

### Step 3: Create index.hbs

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{name}} — Portfolio</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <header>
    <h1>{{name}}</h1>
    <p>{{role}}</p>
  </header>

  <main>
    {{#if bio}}
    <section class="about">
      <h2>About</h2>
      <p>{{bio}}</p>
    </section>
    {{/if}}

    {{#if skills}}
    <section class="skills">
      <h2>Skills</h2>
      <ul>
        {{#each skills}}
          <li>{{this}}</li>
        {{/each}}
      </ul>
    </section>
    {{/if}}

    {{#if projects}}
    <section class="projects">
      <h2>Projects</h2>
      {{#each projects}}
        <article>
          <h3>{{title}}</h3>
          <p>{{description}}</p>
          {{#if link}}
            <a href="{{link}}">View Project</a>
          {{/if}}
        </article>
      {{/each}}
    </section>
    {{/if}}
  </main>

  <footer>
    {{#if contact.email}}
      <p>Email: <a href="mailto:{{contact.email}}">{{contact.email}}</a></p>
    {{/if}}
    {{#if contact.linkedin}}
      <p>LinkedIn: <a href="{{contact.linkedin}}">Profile</a></p>
    {{/if}}
  </footer>
</body>
</html>
```

### Step 4: Create assets/style.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  padding: 40px 0;
  border-bottom: 2px solid #eee;
}

h1 {
  font-size: 32px;
  margin-bottom: 10px;
}

section {
  margin: 40px 0;
}

/* Add more styles as needed */
```

### Step 5: Test Your Template

1. Restart the server
2. Refresh the frontend
3. Your template should appear in the template picker
4. Test by generating a portfolio with it

---

## Template Design Tips

### 1. Responsive Design

Always include mobile-friendly styles:

```css
@media (max-width: 768px) {
  /* Mobile styles */
  body {
    padding: 10px;
  }
  
  h1 {
    font-size: 24px;
  }
}
```

### 2. Typography

- Use web-safe fonts or system fonts for compatibility
- Ensure good contrast for readability
- Use appropriate font sizes (16px+ for body text)

### 3. Colors

- Choose a cohesive color palette (2-3 main colors)
- Ensure sufficient contrast (WCAG AA standards)
- Test in both light and dark environments

### 4. Layout

- Use CSS Grid or Flexbox for modern layouts
- Keep content within readable widths (65-75 characters per line)
- Provide adequate spacing between sections

### 5. Performance

- Optimize images before including
- Minimize CSS file size
- Avoid external dependencies if possible

---

## Troubleshooting Templates

### Template Not Showing Up

1. Check folder name matches `template--name` format
2. Verify `meta.json` exists and is valid JSON
3. Ensure `id` in meta.json matches folder name
4. Restart the server

### Template Generates Empty Page

1. Check `index.hbs` exists in template folder
2. Verify Handlebars syntax is correct
3. Check server console for errors

### Styles Not Applied

1. Verify `assets/style.css` exists
2. Check CSS link path in `index.hbs`
3. Ensure CSS is in the `assets/` folder

---

## Template Examples

See the source code of existing templates for reference:

- **Simple**: `server/templates/template--simple/`
- **Modern**: `server/templates/template--modern/`
- **Classic**: `server/templates/template--classic/`

---

**Last Updated**: 2025-10-07
