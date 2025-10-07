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
   git clone <repository-url>
   cd Portfolio-Builder
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the server** (from the `server` directory):
   ```bash
   cd server
   npm run dev
   ```
   Or with the standard start command:
   ```bash
   npm start
   ```

2. **Start the client** (from the `client` directory):
   ```bash
   cd client
   npm run dev
   ```

The client will typically run on `http://localhost:5173` and the server on its configured port (usually `http://localhost:3000` or similar).

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
├── client/              # React frontend
│   ├── src/            # Source files
│   │   ├── app.jsx     # Main app component
│   │   ├── main.jsx    # Entry point
│   │   └── script.js   # Additional scripts
│   ├── index.html      # HTML template
│   └── package.json    # Client dependencies
├── server/             # Express backend
│   ├── index.js        # Server entry point
│   ├── server.js       # Server configuration
│   └── package.json    # Server dependencies
└── package.json        # Root dependencies
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

ISC

## 👤 Author

Your portfolio, your way!

---

Built with ❤️ using React and Node.js
