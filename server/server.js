const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// When frontend sends data, this route will handle it
app.post('/generate', (req, res) => {
  const { name, bio, skills } = req.body;

  // Create a simple HTML portfolio using that data
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${name}'s Portfolio</title>
      <style>
        body { font-family: Arial; text-align: center; background: #f4f4f4; }
        h1 { color: #2ecc71; }
        .skills { margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>${name}</h1>
      <p>${bio}</p>
      <div class="skills"><b>Skills:</b> ${skills}</div>
    </body>
    </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});