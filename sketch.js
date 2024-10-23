let json_words;
let words;

let input;
let output;
let translation;

let trans;
let sample;

function preload() {
    json_words = loadJSON("/assets/palavras.json", json_loaded, json_error);
}

function json_error(err) {
    console.log("Error: " + err);
}

function json_loaded(json) {
    words = [];

    for (let word of json) {
        let pt = word.pt.split(",");
        words.push(new Word(word.ses, pt));
    }
}

function word_to_numbers(word) {
    let copy = word;
    copy = copy.replaceAll("do", "1");
    copy = copy.replaceAll("re", "2");
    copy = copy.replaceAll("mi", "3");
    copy = copy.replaceAll("fa", "4");
    copy = copy.replaceAll("sol", "5");
    copy = copy.replaceAll("la", "6");
    copy = copy.replaceAll("si", "7");
    copy = copy.replaceAll("'", "0");
    return [copy, word];
}

function setup() {
    noCanvas();

    input = select("#txtinput");
    output = select("#translation");
    translation = select("#trad");

    input.input(checkInput);
}

function checkInput() {
    let values = input.value().split(/(?=[.,;:"?! ])|(?<=[.,;:"?!])/g);
    trans = "";
    sample = "";

    values = values.filter(x => x != " ");

    for (let value of values) {
        value = value.trim();
        checkTranslation(word_to_numbers(value.toLowerCase()));
    }

    output.html(trans.trim());
    translation.html(sample.trim());
}

function checkTranslation(value) {
    let number = value[0];
    let string = value[1];

    if (Number(number)) {
        let zero = number.indexOf("0") - number.length;
        let word = words.find((x) => x.ses == number.replaceAll("0", ""));

        if (word) {
            trans += string.replaceAll("'", "") + ":&emsp;" + word.pt + "<br/>";
            sample += " " + word.pt[0];

            switch (zero) {
                case -1: sample += " (adv.)"; break;
                case -2: sample += " (adj.)"; break;
            }
        }
    } else {
        trans += "~" + string + "~<br/>";
        sample += " " + string;
    }
}

function draw() {}

class Word {
    constructor(ses, pt) {
        this.ses = ses;
        this.pt = pt;
    }
}