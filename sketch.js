let json_words;
let words;

let input;
let output;
let translation;

let trans;
let sample;
let ponctuation;

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

function word_to_colored(word) {
    let colored = word;
    colored = colored.replaceAll("do", "<span style=\"color: #e81416; font-weight:bold;\">do</span>");
    colored = colored.replaceAll("re", "<span style=\"color: #ffA500; font-weight:bold;\">re</span>");
    colored = colored.replaceAll("mi", "<span style=\"color: #fAeb36; font-weight:bold;\">mi</span>");
    colored = colored.replaceAll("fa", "<span style=\"color: #79c314; font-weight:bold;\">fa</span>");
    colored = colored.replaceAll("sol", "<span style=\"color: #487de7; font-weight:bold;\">sol</span>");
    colored = colored.replaceAll("la", "<span style=\"color: #4b369d; font-weight:bold;\">la</span>");
    colored = colored.replaceAll("si", "<span style=\"color: #70369d; font-weight:bold;\">si</span>");
    return colored;
}

function setup() {
    noCanvas();

    ponctuation = ".,;:?!\" ".split("");

    input = select("#txtinput");
    output = select("#translation");
    translation = select("#trad");

    input.input(checkInput);
}

function checkInput() {
    let values = input.value().split(/(?=[.,;:"?! \n\t\r])|(?<=[.,;:"?!])/g);
    trans = [];
    sample = [];

    values = values.filter(x => x != "" && x != " " && x != "\n");

    for (let value of values) {
        value = value.trim();
        checkTranslation(word_to_numbers(value.toLowerCase()));
    }

    output.html(trans.join(""));
    translation.html(sample.join(""));
}

function checkTranslation(value) {
    let number = value[0];
    let string = value[1];

    let error = true;

    if (ponctuation.includes(string)) {
        sample.push(string);
        return;
    }

    if (Number(number)) {
        let zero = number.indexOf("0");
        let replaced = number.replaceAll("0", "");
        let len = replaced.length;
        let word = words.find((x) => x.ses == replaced);
        let len3 = false;
        let len4 = false;

        if (word) {
            let colored = word_to_colored(string.replaceAll("'", ""));
            let result = colored;

            switch (len) {
                case 4: result = colored + ":&emsp;" + word.pt + "<br/>"; len4 = true; break;
                case 3: result = colored + ":&emsp;&emsp;" + word.pt + "<br/>"; len3 = true; break;
                case 2: result = colored + ":&emsp;&emsp;&emsp;" + word.pt + "<br/>"; break;
                case 1: result = colored + ":&emsp;&emsp;&emsp;&emsp;" + word.pt + "<br/>"; break;
            }

            if (trans.indexOf(result) == -1) trans.push(result);
            sample.push(" " + word.pt[0]);

            if (len3) {
                switch (zero) {
                    case 1: sample.push(" (subs.)"); break;
                    case 2: sample.push(" (adj.)"); break;
                    case 3: sample.push(" (adv.)"); break;
                }
            } else if (len4) {
                switch (zero) {
                    case 1: sample.push(" (subs.)"); break;    
                    case 2: sample.push(" (subs. aquele que ...)"); break;
                    case 3: sample.push(" (adj.)"); break;
                    case 4: sample.push(" (adv.)"); break;
                }
            }

            error = false;
        }
    }
    
    if (error) {
        let mistake = "~" + string + "~<br/>";
        if (trans.indexOf(mistake) == -1) trans.push(mistake);
        sample.push(" " + string);
    }
}

function draw() {}

class Word {
    constructor(ses, pt) {
        this.ses = ses;
        this.pt = pt;
    }
}