const http = require('http');
throw new Error("fail");

const server = http.createServer((req, res) => {
  res.end("Deployed via Jenkins CI/CD 🚀");
});

server.listen(999999, () => {
  console.log("Server running");
});

