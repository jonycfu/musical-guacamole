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

const HIGH_SCORE_LIST = [
  { name: 'John Bell', score: 390 },
  { name: 'Jill Bell', score: 490 },
  { name: 'Jake Bell', score: 130 },
  { name: 'Jordan Bell', score: 200 },
  { name: 'Jack Bell', score: 300 },
  { name: 'Jenny Bell', score: 130 },
];

server.get('/secret-words', function(req, res, next) {
  res.json({ payload: WORD_POOL_LIST });
});

server.get('/high-scores', function(req, res) {
  res.json({ payload: HIGH_SCORE_LIST });
});

//TODO: provide dotenv to read $PORT
server.listen(1337, function() {
  console.log('api server listening on port 1337');
});
