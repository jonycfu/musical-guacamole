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
  {
    name: 'John Bell',
    score: 390,
    datetime: new Date('December 17, 1995 03:24:00'),
  },
  {
    name: 'Jill Bell',
    score: 490,
    datetime: new Date('October 19, 1995 03:24:00'),
  },
  {
    name: 'Jake Bell',
    score: 130,
    datetime: new Date('October 19, 1995 03:24:00'),
  },
  {
    name: 'Jordan Bell',
    score: 200,
    datetime: new Date('October 19, 1995 03:24:00'),
  },
  {
    name: 'Jack Bell',
    score: 300,
    datetime: new Date('October 19, 1995 03:24:00'),
  },
  {
    name: 'Jenny Bell',
    score: 130,
    datetime: new Date('October 19, 1995 03:24:00'),
  },
];

server.get('/secret-words', function(req, res, next) {
  res.json({ payload: WORD_POOL_LIST });
});

server.get('/high-scores', function(req, res) {
  res.json({ payload: HIGH_SCORE_LIST });
});

server.put('/high-scores', function(req, res) {
  console.log(req);

  res.json({
    payload: {
      code: 200,
      message: `Update Success:`,
    },
  });
});

//TODO: provide dotenv to read $PORT
server.listen(1337, function() {
  console.log('api server listening on port 1337');
});
