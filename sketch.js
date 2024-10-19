let table_of_words;
let words;

function preload() {
    table_of_words = loadTable("/assets/words.csv", "header", loadData);
}

function loadData(table) {
    words = [];
    let tableRows = table.getRows();
    for (let row of tableRows) {
        let ses = row.getString("solresol");

        words.push(new Word(ses));
    }
}

function setup() {
    for (let word of words) {
        word.display(160, 100);
    }
}

function draw() {
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