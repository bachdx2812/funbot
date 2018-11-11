const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')

  let data = [
      {
        isBot: true,
        content: 'こんにちは'
      },
      {
        isBot: false,
        content: 'Nothing'
      },
      {
        isBot: true,
        content: 'what is your name'
      },
      {
        isBot: false,
        content: 'My name is Bach'
      }
  ]

  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

