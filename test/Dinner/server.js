const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
};

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`);

    if (req.url.startsWith('/api/response')) {
        const urlParams = new URL(req.url, `http://${req.headers.host}`);
        const answer = urlParams.searchParams.get('answer');

        if (answer === 'yes') {
            console.log('\x1b[32m%s\x1b[0m', 'SHE SAID YES! ❤️'); // Green text
        } else {
            console.log('She clicked no... 😢');
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Logged');
        return;
    }

    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Open your browser and go to this URL to show her!');
});
