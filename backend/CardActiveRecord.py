#PATTERNS: Card Active Record
import sqlite3

class CardActiveRecord(object):
    def __init__(self, id, name, description, mana, hp, atk):
        self.id = id
        self.name = name
        self.description = description
        self.mana = mana
        self.hp = hp
        self.atk = atk
    

    def insert(self):
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        c.execute("INSERT INTO Card (id, name, description, mana, hp, atk) VALUES (\'"+str(self.id)+"\', \'" + str(self.name) +"\', \'" + str(self.description) +"\', \'" + str(self.mana) +"\', \'" + str(self.hp) +"\', \'" + str(self.atk) +"\')")
        conn.commit()
        conn.close
        print("added card successfully")

    def find(id):
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        c.execute("SELECT * FROM Card WHERE id=?", (id,))
        p = c.fetchone()
        print(p)
        cClass = CardActiveRecord(p[0], p[1], p[2], p[3], p[4], p[5])
        conn.commit()
        conn.close
        return cClass

    def deleteCard(id):
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        c.execute("DELETE FROM Card WHERE id=?", (id,))
        conn.commit()
        conn.close
        print("deleted card successfully")

    