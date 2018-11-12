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


  let QUESTION_TYPE_NAME = 1;
  let QUESTION_TYPE_RADIO = 2;
  let QUESTION_TYPE_CHECKBOX = 3;

  let data = [
      {
        content: 'Hello, is this me youre looking for.',
        isQuestion: false
      },
      {
        content: 'What is your name',
        isQuestion: true,
        questionType: QUESTION_TYPE_NAME
      },
      {
        content: 'What is your gender',
        isQuestion: true,
        questionType: QUESTION_TYPE_RADIO,
        options: ['male', 'female', 'other']
      },
      {
        content: 'What do you want',
        isQuestion: true,
        questionType: QUESTION_TYPE_CHECKBOX,
        options: ['books', 'game', 'macbook pro', 'redbull', 'malboro']
      }
  ]

  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
