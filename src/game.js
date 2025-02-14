const { loadWordList } = require("./fileReader");

const wordList = loadWordList("data/wordList.txt");

function generateRandomWord(){
    return wordList[Math.floor(Math.random() * wordList.length)];
}

module.exports = { generateRandomWord };