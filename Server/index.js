const app = require('./app');

// ✅ Vercel export
module.exports = app;

// ✅ Local server
if (require.main === module) {
  const http = require('http');
  const port = process.env.PORT || 8000;
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

  server.on('error', (error) => {
    console.error('Server error:', error);
  });
}
