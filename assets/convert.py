import csv, json

words = list()

class Word:
    def __init__(self, ses, eng):
        self.ses = ses
        self.eng = eng

with open("words.csv", mode="r") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        word = Word(row["solresol"], row["english"])
        words.append(word)
    print("CSV Done!")

with open("words.json", mode="w") as json_file:
    json.dump([word.__dict__ for word in words], json_file)
    print("JSON Done!")
