import sqlite3
import PlayerDataMapper
from Card import Card

#pass
def getCardByName(name):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    query =  "SELECT id, name, description, mana, hp, atk FROM Card WHERE name='{}'".format(name)
    c.execute(query)
    p = c.fetchone()
    if(p != None):
        print(p)
        pClass = Card(p[0], p[1], p[2], p[3] ,p[4], p[5])
        conn.commit()
        conn.close
        return pClass
    conn.commit()
    conn.close
    return None

#pass
def CreateCard(name, description, mana, hp, atk):
    if getCardByName(name) == None:
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        query =  "INSERT INTO Card (name, description, mana, hp, atk) VALUES('{}','{}','{}',{},{})".format(name, description, mana, hp,atk)
        c.execute(query)
        conn.commit()
        conn.close()
        print('card created sucessfully')
        return True
    else:
        print('card with name: {} already exists in database.'.format(name))
        return False

#pass
def DeleteCard(name):
    if getCardByName(name) != None:
        conn = sqlite3.connect('db.sqlite3')
        id = __getCardIdByName__(name)

        c = conn.cursor()
        c.execute("DELETE FROM Card WHERE name='{}'".format(name))
        conn.commit()

        
        c = conn.cursor()
        c.execute("DELETE FROM CardsRelation WHERE idCard={}".format(id))
        conn.commit()

        conn.close()
        print('card removed sucessfully')
        return True
    else:
        print('card with name: {} does not exists in database.'.format(name))
        return False

#pass
def AssignCardFor(userName, cardName):
    playerId= PlayerDataMapper.__getPlayerIdByName__(userName)
    cardId = __getCardIdByName__(cardName)

    if cardId!=None and playerId!=None:
        if __checkIfRowIsInDb(playerId,cardId):
            conn = sqlite3.connect('db.sqlite3')
            c = conn.cursor()
            query =  "INSERT INTO CardsRelation (idPlayer, idCard) VALUES({},{})".format(playerId, cardId)
            c.execute(query)
            conn.commit()
            print('card {} was assigned to player {} sucessfully'.format(cardName,userName))
            return True
        else:
            print('user {} already has this card'.format(userName))
            return False
    elif cardId == None:
        print('card {} does not extist in database'.format(cardName))
        return False
    elif playerId == None:
        print('player {} does not extist in database'.format(cardName))
        return False
    else:
        print('unknown error occured')
        return False

def __getCardIdByName__(name):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    query =  "SELECT id FROM Card WHERE name='{}'".format(name)
    c.execute(query)
    p = c.fetchone()
    conn.commit()
    conn.close()
    if p!=None:
        return p[0]
    return None

def __checkIfRowIsInDb(playerId,cardId):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    query =  "SELECT idPlayer From CardsRelation WHERE idCard={} and idPlayer={}".format(cardId,playerId)
    c.execute(query)
    p = c.fetchone()
    conn.commit()
    conn.close()
    if p==None:
        return True
    return False
