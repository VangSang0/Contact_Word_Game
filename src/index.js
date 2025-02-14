const { generateRandomWord } = require("./game");

randomWord = generateRandomWord().toLowercase().trim();

console.log(randomWord);