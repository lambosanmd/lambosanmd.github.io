let table_of_words;
let words;

function preload() {
    console.log("will it load?");
    table_of_words = loadTable("/assets/words.csv", "header", loadData);
}

function loadData(table) {
    words = [];
    let tableRows = table.getRows();
    for (let row of tableRows) {
        let ses = row.getString("solresol");

        words.push(new Word(ses));
    }
    console.log("Data loaded");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    for (let word of words) {
        word.display(160, 100);
    }
}

class Word {
    constructor(ses) {
        this.ses = ses;
    }

    display(x, y) {
        fill(0);
        noStroke();
        textAlign(CENTER);
        text(this.ses, x, y);
    }
}