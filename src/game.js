const readlineSync = require("readline-sync");
const { loadWordList } = require("./fileReader");

const wordList = loadWordList("data/wordList.txt");

function generateRandomWord(){
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function doesWordExist(word) {
    word = word.toUpperCase().trim();
    return wordList.includes(word);
}

function doesWordBeginWith(word, wordSubstring) {
    word = word.toLowerCase().trim();
    wordSubstring = wordSubstring.toLowerCase().trim();
    return word.startsWith(wordSubstring);
}

function startGame() {
    let randomWord = generateRandomWord();
    let charCount = 1;
    let gameStart = true;
    let incorrectGuesses = 0;
    while(gameStart && charCount < randomWord.length) {
        wordSubstring = randomWord.substring(0, charCount);
        userInput = readlineSync.question(`Enter a word that starts with the letters ${wordSubstring}: `);
        userInput = userInput.toLowerCase().trim();
        if(userInput === randomWord) {
            console.log(`Congratulations! The word was ${randomWord}`);
            gameStart = false;
        } else if(doesWordExist(userInput) && doesWordBeginWith(userInput, wordSubstring)) {
            console.log("That is an Acceptable Entry!");
            charCount++;
        }else{
            console.log("Incorrect! Try again.");
            incorrectGuesses++;
        }
        if(incorrectGuesses === 5) {
            console.log(`You have made 5 incorrect guesses. The word was ${randomWord}`);
            gameStart = false;
        }
        if(charCount === randomWord.length) {
            console.log(`Congratulations! I have no more letters to give you: ${randomWord}`);
            gameStart = false;
        }
    }
}
module.exports = { generateRandomWord, doesWordExist, doesWordBeginWith, startGame};