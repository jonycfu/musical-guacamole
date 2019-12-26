const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());

const WORD_POOL_LIST = [
  "3dhubs",
  "marvin",
  "print",
  "filament",
  "order",
  "layer"
];
const randomDrawFromList = () => {
  const getRandomRangeOf = max => Math.floor(Math.random() * Math.floor(max));
  const randomIndexFromList = getRandomRangeOf(WORD_POOL_LIST.length);

  return WORD_POOL_LIST[randomIndexFromList];
};

server.get("/hangman-secret", function(req, res, next) {
  const randomWord = randomDrawFromList();

  res.json({ payload: randomWord });
});

server.listen(1337, function() {
  console.log("api server listening on port 1337");
});
