#PATTERNS: Repository dla kart + Serialized LOB dla kart

class CardRepository(object):
    def __init__(self, cards):
        self.cardsLOB = cards

    def __init__(self):
        self.cardsLOB = []

    def add(self, c):
        self.cardsLOB.append(c)

    def find(self, name):
        for k in self.cardsLOB:
            if k.getName() == name:
                return k
        return None

    def delete(self, name):
        for k in self.cardsLOB:
            if k.getName() == name:
                self.cardsLOB.remove(k)