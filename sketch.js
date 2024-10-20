let table_of_words;
let words_json;
let words;
let input;
let translation_input;
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
    translation_input = select("#translation");

    input.input(changeInput);
}

function changeTranslation(value) {
    let found = undefined;

    for (let word of words) {
        found = word.getWord(value);
        if (found) break;
    }

    if (found != undefined) {
        translation += found.eng[0]; //random(found.eng);
    } else {
        translation += "{not found: ";
        translation += value;
        translation += "}";
    }
    translation += " ";
}

function changeInput() {
    let values = splitTokens(input.value(), " ,.!?");
    translation = "";
    // console.log(values);

    for (let value of values) {
        changeTranslation(value);
    }

    // console.log(translation);

    translation_input.html(translation.trimEnd() + ".");
}

function draw() {
    background("#CBC3E3");
    stroke(0);
    fill(255);
    rect(160, 200, 180, 20);
    noStroke();
    fill(0);
    // textAlign(CENTER);
    text(translation, 170, 215);
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
    }

    display(x, y, pos) {
        fill(0);
        noStroke();
        textAlign(CENTER);
        text("'" + random(this.eng) + "'", x, y);
    }
}