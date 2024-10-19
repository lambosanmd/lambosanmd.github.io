let table_of_words;
let words_json;
let words;
let input;
let translation = "";

let has_json = false;

function preload() {
    words_json = loadJSON("/assets/words.json", loadJSONdata, loadFailed);
    table_of_words = loadTable("/assets/words.csv", "header", loadData);
}

function loadFailed(error) {
    has_json = false;
}

function loadJSONdata(json) {
    words = [];
    has_json = true;

    for (let word of json) {
        words.push(new Word(word.ses, word.eng, word.pos));
    }

    console.log(words);
}

function loadData(table) {
    if (has_json) return;

    words = [];
    let tableRows = table.getRows();
    const delim = ",";

    for (let row of tableRows) {
        let ses = row.getString("solresol");
        let eng = row.getString("english");
        let pos = row.getString("part_of_speech");

        let new_eng = split(eng, delim).map(str => str.trim());
        words.push(new Word(ses, new_eng, pos));
    }
    
    saveJSON(words, "/assets/words.json");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    input = createInput("solresol");
    input.position(160, 160);
    input.changed(changeInput);

    changeInput();
}

function changeTranslation(value) {
    let found = undefined;

    for (let word of words) {
        found = word.getWord(value);
        if (found) break;
    }

    if (found != undefined) {
        translation += random(found.eng);
    } else {
        translation += "<not found: ";
        translation += value;
        translation += ">";
    }
    translation += " ";
}

function changeInput() {
    let values = splitTokens(input.value(), " ,.!?");
    translation = "";
    console.log(values);

    for (let value of values) {
        changeTranslation(value);
    }
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