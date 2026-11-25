
const http = require('http');

const PORT = process.env.PORT || 3000;

function createServer() {
    return http.createServer((req, res) => {
        if (req.url === '/health') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify({
                status: 'healthy',
                application: 'node-app'
            }));
        }

        if (req.url === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            return res.end('Deployed via Jenkins CI/CD!');
        }

        res.writeHead(404);
        res.end('Not Found');
    });
}

if (require.main === module) {
    const server = createServer();

    server.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = { createServer };


