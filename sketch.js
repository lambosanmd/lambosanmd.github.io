let table_of_words;
let words_json;
let words;
let input;
let output;
let translation = "";

function preload() {
    words_json = loadJSON("/assets/words.json", loadJSONdata, loadFailed);
}

function loadFailed(error) {
    console.log("ERROR: " + error);
    
}

function loadJSONdata(json) {
    words = [];

    for (let word of json) {
        words.push(new Word(word.ses, word.eng, word.pos));
    }
}

function setup() {
    noCanvas();

    input = select("#txt");
    output = select("#translation");

    input.input(changeInput);
}

function checkReduction(old) {
    let found = undefined;
    let value = "";

    let s = 0;

    for (let i = 0; i < old.length; i++) {
        let letter = old[i];
        if (s % 2 == 0) {
            switch (letter) {
                case "d": value += "do"; break;
                case "r": value += "re"; break;
                case "m": value += "mi"; break;
                case "f": value += "fa"; break;
                case "s": value += "sol"; break;
                case "l": value += "la"; break;
                case "t": value += "si"; break;
            }
        } else {
            switch (letter) {
                case "a": {
                    if (old[i + 1] == "u") { value += "la"; i++; }
                    else value += "fa";
                    break;
                }
                case "e": value += "re"; break;
                case "i": {
                    if (old[i + 1] == "u") { value += "si"; i++; }
                    else value += "mi";
                    break;
                }
                case "o": {
                    if (old[i + 1] == "u") { value += "sol"; i++; }
                    else value += "do";
                    break;
                }
            }
        }

        s++;
    }

    if (value == "") {
        translation += "~";
        translation += old;
        translation += "~<br/>";
        return;
    }

    for (let word of words) {
        found = word.getWord(value);
        if (found) break;
    }

    if (found != undefined) {
        translation += found.ses + ":&emsp;&emsp;" + found.eng + "<br/>";
    } else {
        translation += "~";
        translation += value;
        translation += "~<br/>";
    }
}

function changeTranslation(value) {
    let found = undefined;

    if (value === "") return;

    if ([".", ",", ":", ",", "\"", "?", "!"].includes(value)) {
        translation += value + "<br/>";
        return;
    }

    for (let word of words) {
        found = word.getWord(value);
        if (found) break;
        // else found = word;
    }

    if (found != undefined) {
        translation += found.ses + ":&emsp;&emsp;" + found.eng + "<br/>";
    // }
    } else {
        checkReduction(value.toLowerCase());
    }
    // }

    // if (found == undefined) translation += "--";
}

function changeInput() {
    // let values = splitTokens(input.value(), " ,.!?");
    let values = input.value().split(/(?=[.,:;"?! ])|(?<=[.,:;"?!])/g)
    translation = "";

    for (let value of values) {
        value = value.trim();
        if (value.length == 1 || (value.length == 2 && (value == "SO"))) changeTranslation(value);
        else changeTranslation(value.toLowerCase().replaceAll("'", ""));
    }

    output.html(translation.trimEnd());
}

function draw() {
}

class Word {
    constructor(ses, eng, pos) {
        this.ses = ses;
        this.eng = eng;
        this.pos = pos;
    }

    getWord(word) {
        if (this.ses == word) return this;
        return undefined;

        // let count = 0;
        // for (let letter of word) {
        //     if (this.ses[count++] != letter)
        //         return undefined;
        // }
        // return this;
    }
}