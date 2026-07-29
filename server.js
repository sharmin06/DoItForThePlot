const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Decode the URL to handle spaces and special characters
  let filePath = '.' + decodeURI(req.url);
  
  // If the path is a directory, try to serve index.html or list files
  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
    if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    } else {
       // Simple directory listing
      fs.readdir(filePath, (err, files) => {
        if (err) {
            res.writeHead(500);
            res.end('Error listing directory');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Directory Listing</h1><ul>');
        files.forEach(file => {
           res.write(`<li><a href="${path.join(req.url, file)}">${file}</a></li>`);
        });
        res.write('</ul>');
        res.end();
      });
      return;
    }
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
         res.writeHead(404, { 'Content-Type': 'text/plain' });
         res.end('404 Not Found');
      }
      else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
      }
    }
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(8000, () => {
  console.log('Server running at http://127.0.0.1:8000/');
});
