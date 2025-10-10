# Portfolio Builder

Create beautiful portfolio websites in minutes with our easy-to-use builder.

## ✨ What's New (v2.1)

- 🎨 **6 Professional Templates** (Simple, Modern, Classic, Minimalist, Dark Mode, Creative)
- 👁️ **Live Preview** before downloading
- ✅ **Form Validation** with real-time feedback
- 🔔 **Toast Notifications** for better UX
- 🎨 **Modern UI** with gradients and animations
- 🔒 **Security** features built-in

## 🚀 Quick Start

### Installation

```bash
# Clone and install
git clone https://github.com/Sangu-dev/Portfolio-Builder.git
cd Portfolio-Builder
npm run install:all
```

### Running

**Option 1: Easy Way (Windows)**
```bash
.\start-all.bat
```

**Option 2: Manual**
```bash
# Terminal 1 - Server
npm run dev:server

# Terminal 2 - Client  
npm run dev:client
```

Then open: **http://localhost:5173**

## 🎯 Features

### Templates (6 Available)
1. **Simple** - Clean, one-page layout
2. **Modern** - Two-column with sidebar
3. **Classic** - Traditional elegant design
4. **Minimalist** - Ultra-clean with whitespace
5. **Dark Mode** - Modern dark theme with glassmorphism
6. **Creative** - Colorful with animations

### Functionality
- ✅ Live preview before download
- ✅ Form validation with error messages
- ✅ Add/remove skills and projects easily
- ✅ Export as ZIP file
- ✅ Fully responsive design
- ✅ No coding required

## 📦 Tech Stack

**Frontend:** React 18 + Vite  
**Backend:** Node.js + Express  
**Templates:** Handlebars

## 📁 Structure

```
Portfolio-Builder/
├── client/          # React frontend
├── server/          # Express backend
│   └── templates/   # 6 portfolio templates
├── docs/            # Documentation
└── start-all.bat    # Easy start script (Windows)
```

## 🛠️ Available Commands

```bash
npm run install:all    # Install all dependencies
npm run dev:server     # Start server (port 5000)
npm run dev:client     # Start client (port 5173)
npm run build          # Build for production
```

## 📚 Documentation

- **Quick Start**: See above
- **Templates**: Check `server/templates/` folders
- **API**: Server runs on port 5000
- **Troubleshooting**: Restart with `.\start-all.bat`

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

ISC

---

**Version**: 2.1.0  
**Templates**: 6  
Built with ❤️ using React and Node.js
