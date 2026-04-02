const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/info', (req, res) => {
  res.json({
    name: 'kevin-tp',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><title>kevin-tp</title></head>
    <body>
      <h1>Welcome to kevin-tp</h1>
      <p>Application deployee via CI/CD GitHub Actions</p>
    </body>
    </html>
  `);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
