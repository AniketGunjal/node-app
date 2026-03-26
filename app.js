const http = require('http');

const server = http.createServer((req, res) => {
  res.end("Deployed via Jenkins CI/CD 🚀");
});

server.listen(3000, () => {
  console.log("Server running");
});
