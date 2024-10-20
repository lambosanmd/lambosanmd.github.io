let table;

function preload() {
    table = loadTable("/assets/words.csv", "header", loadData);
}

function loadData(table) {
    let words = [];
    let tableRows = table.getRows();
    const delim = ",";

    for (let row of tableRows) {
        let ses = row.getString("solresol");
        let eng = row.getString("english");
        let pos = row.getString("part_of_speech");

        let new_eng = split(eng, delim).map(str => str.trim());
        words.push(new Word(ses, new_eng, pos));
    }
    
    saveJSON(words, "words.json");
}

function setup() {
    noCanvas();
}

function draw() {}

class Word {
    constructor(ses, eng, pos) {
        this.ses = ses;
        this.eng = eng;
        this.pos = pos;
    }
}