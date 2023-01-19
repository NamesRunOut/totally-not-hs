class Card(object):
    def __init__(self, id, name, description, mana, hp, atk):
        self.id = id
        self.name = name
        self.description = description
        self.mana = mana
        self.hp = hp
        self.atk = atk

    def getDict(self):
        return {'id': self.id, "name": self.name, "description": self.description, "mana": self.mana, "hp": self.hp, "atk": self.atk}