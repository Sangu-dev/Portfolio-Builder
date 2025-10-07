# Portfolio Builder

A full-stack web application that allows users to dynamically create and customize their portfolio websites.

## 🚀 Features

- **Dynamic Portfolio Generation**: Create personalized portfolio websites with ease
- **Template-based System**: Uses Handlebars templating for flexible customization
- **File Upload Support**: Upload images and assets for your portfolio
- **Export Functionality**: Download your completed portfolio as a ZIP file
- **Modern UI**: Built with React and Vite for a fast, responsive experience

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Vite** 5.0.0 - Build tool and development server
- Modern JavaScript (ES6+)

### Backend
- **Node.js** with Express 4.18.2
- **Handlebars** - Template engine
- **Multer** - File upload handling
- **Archiver** - ZIP file generation
- **CORS** - Cross-origin resource sharing
- **fs-extra** - Enhanced file system operations
- **UUID** - Unique identifier generation

## 📋 Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mrtracker-new/Portfolio-Builder.git
   cd Portfolio-Builder
   ```

2. **Install all dependencies at once**
   ```bash
   npm run install:all
   ```

   Or install individually:
   ```bash
   npm install              # Root
   cd client && npm install # Client
   cd ../server && npm install # Server
   ```

## 🚀 Running the Application

### Development Mode

**You need TWO terminal windows:**

**Terminal 1 - Start the server** (port 5000):
```bash
npm run dev:server
```

**Terminal 2 - Start the client** (port 5173):
```bash
npm run dev:client
```

Then open your browser:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Production Build

To build the client for production:
```bash
cd client
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
Portfolio-Builder/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ProfileForm.jsx
│   │   │   └── TemplatePicker.jsx
│   │   ├── app.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── styles.css        # Global styles
│   ├── index.html
│   ├── vite.config.mjs       # Vite configuration
│   ├── .env.example          # Environment variables example
│   └── package.json
│
├── server/                    # Express Backend
│   ├── templates/            # Portfolio templates
│   │   ├── template--simple/    # Simple template
│   │   ├── template--modern/    # Modern sidebar template
│   │   └── template--classic/   # Classic professional template
│   ├── tmp/                  # Generated portfolios (git-ignored)
│   ├── index.js              # Main server file
│   ├── .env.example          # Environment variables example
│   └── package.json
│
├── docs/                      # 📚 Documentation
│   ├── README.md             # Documentation index
│   ├── QUICK_START.md        # Quick start guide
│   ├── DEVELOPMENT.md        # Development guide
│   ├── API.md                # API documentation
│   ├── TEMPLATES.md          # Templates guide
│   └── IMPROVEMENTS.md       # Change log
│
├── start-all.bat             # Windows: Start both server & client
├── start-server.bat          # Windows: Start server only
├── start-client.bat          # Windows: Start client only
├── package.json              # Root scripts & dependencies
├── .gitignore
└── README.md
```

## 📚 Documentation

For detailed documentation, see the [`docs/`](docs/) folder:

- **[Quick Start Guide](docs/QUICK_START.md)** - Get started in minutes
- **[Development Guide](docs/DEVELOPMENT.md)** - Full development documentation
- **[Improvements Log](docs/IMPROVEMENTS.md)** - What's been fixed and added

## 🎯 Quick Commands

```bash
# Install all dependencies
npm run install:all

# Start server (Terminal 1)
npm run dev:server

# Start client (Terminal 2)
npm run dev:client

# Build for production
npm run build
```

**Windows Users**: Just double-click `start-all.bat` to run everything!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Please read our [Development Guide](docs/DEVELOPMENT.md) before contributing.

## 📝 License

ISC

## 👤 Author

Your portfolio, your way!

## 🔗 Links

- Repository: [GitHub](https://github.com/Sangu-dev/Portfolio-Builder)
- Documentation: [docs/](docs/)
- Issues: [GitHub Issues](https://github.com/Sangu-dev/Portfolio-Builder/issues)

---

Built with ❤️ using React and Node.js
