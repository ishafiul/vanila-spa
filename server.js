const http = require('http');
const fs = require('fs');
const path = require('path');

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

// Simple HTTP server
const server = http.createServer((req, res) => {
  // Handle favicon requests
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Normalize URL to prevent directory traversal
  let urlPath = req.url;
  if (urlPath === '/') {
    urlPath = '/app/index.html';
  } else if (urlPath.startsWith('/core')) {
    urlPath = `/app${urlPath}`;
  } else {
    // For SPA routing, serve the index.html for all other routes
    urlPath = '/app/index.html';
  }

  // Get the file path
  const filePath = path.join(__dirname, urlPath);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read and serve the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found, serve index.html for SPA routing
        fs.readFile(path.join(__dirname, '/app/index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading the application');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Successful response
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
