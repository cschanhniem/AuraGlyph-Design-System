const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// MIME types for common file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url);
  
  // Get the path from the URL
  let pathname = parsedUrl.pathname;
  
  // If path is '/', serve the index.html file
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Convert URL path to local file path
  const filePath = path.join(__dirname, pathname);
  
  // Get the file extension
  const extname = path.extname(filePath);
  
  // Set the default content type as binary
  let contentType = 'application/octet-stream';
  
  // Check if the file extension has a defined MIME type
  if (extname in mimeTypes) {
    contentType = mimeTypes[extname];
  }
  
  // Read the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file not found
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      
      // For other errors
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
      return;
    }
    
    // If successful, send the file content with appropriate headers
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`To view the AuraGlyph components, open http://localhost:${PORT}/ in your browser`);
});