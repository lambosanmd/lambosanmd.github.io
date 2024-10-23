import csv, json

words = list()

class Word:
    def __init__(self, ses, pt):
        self.ses = ses
        self.pt = pt

with open("palavras.csv", mode="r", encoding="utf-8") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        word = Word(row["solresol"], row["pt"])
        words.append(word)
    print("CSV Done!")

with open("palavras.json", mode="w", encoding="utf-8") as json_file:
    json.dump([word.__dict__ for word in words], json_file, indent=4, ensure_ascii=False)
    print("JSON Done!")
