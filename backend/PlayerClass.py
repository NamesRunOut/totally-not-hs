class Player(object):
    def __init__(self, id, name, health, email):
        self.id = id
        self.name = name
        self.health = health
        self.email = email

    def GetCards():
        pass

    def ChangeName(self, name):
        self.name = name

    def changeHealth(self, value):
        self.health += value
