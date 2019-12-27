const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());

const WORD_POOL_LIST = [
  '3dhubs',
  'marvin',
  'print',
  'filament',
  'order',
  'layer',
];

server.get('/secret-words', function(req, res, next) {
  res.json({ payload: WORD_POOL_LIST });
  console.log('Server-side: list sent!');
});

//TODO: provide dotenv to read $PORT
server.listen(1337, function() {
  console.log('api server listening on port 1337');
});
