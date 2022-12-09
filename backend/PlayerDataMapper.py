import sqlite3
from PlayerClass import Player

def addPlayer(id, points):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    c.execute("INSERT INTO Player (id, points) VALUES (\'"+str(id)+"\', \'" + str(points) +"\')")
    conn.commit()
    conn.close
    print("added player successfully")

def findPlayerById(id):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    c.execute("SELECT * FROM Player WHERE id=?", (id,))
    p = c.fetchone()
    print(p)
    pClass = Player(p[0], p[1])
    conn.commit()
    conn.close
    return pClass
    

def deletePlayer(id):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    c.execute("DELETE FROM Player WHERE id=?", (id,))
    conn.commit()
    conn.close
    print("deleted player successfully")
