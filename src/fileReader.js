const fs = require('fs');

function loadWordList(filepath) {
    try{
        const data = fs.readFileSync(filepath, 'utf8');
        const words = data.split('\n');
        return words;
    }
    catch(err) {
        console.error(`Error reading the Word List provided: ${err}`);
        return new Array();
    }
}


module.exports = { loadDictionary };