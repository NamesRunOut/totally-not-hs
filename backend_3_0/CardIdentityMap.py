class CardIdentityMap:
    cards = []

    def get(self, name):
        for c in self.cards:
            if c.name == name:
                return c
        return None

    def load(self, c):
        self.cards.append(c)
    