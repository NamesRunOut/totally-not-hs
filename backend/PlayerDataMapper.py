import sqlite3
from Player import Player

#pass
def addPlayer(name, health, email, points, isVip=False, bonus = 0):
    if getPlayerByName(name)==None:
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        query =  "INSERT INTO Player (name, health, email, points) VALUES('{}',{},'{}',{})".format(name, health, email, points)
        c.execute(query)
        conn.commit()
        p = __getPlayerIdByName__(name)
        if p!= None:
            if isVip:
                query =  "INSERT INTO VipPlayer (id, bonus) VALUES({},{})".format(p, bonus)
                c.execute(query)
                conn.commit()
            else:
                query =  "INSERT INTO CommonPlayer (id, isBanned) VALUES({},{})".format(p, 0)
                c.execute(query)
                conn.commit()
        else:
            conn.close()
            print("some error occured check your DB status")
            return False
        conn.close()
        print("player with name {} was added sucessfully".format(name))
        return True
    else:
        print("player with derived name: {} already exists in database.".format(name))
        return False

#pass
def becomeVip(name, bonus = 0):
    playerId = __getPlayerIdByName__(name)
    conn = sqlite3.connect('db.sqlite3')

    if playerId!= None:
        c = conn.cursor()
        query =  "Select id From CommonPlayer Where id ={}".format(playerId)
        c.execute(query)
        conn.commit()
        p = c.fetchone()
        if p != None:

            c = conn.cursor()
            query =  "INSERT INTO VipPlayer (id, bonus) VALUES({},{})".format(playerId, bonus)
            c.execute(query)
            conn.commit()

            c = conn.cursor()
            query =  "DELETE FROM CommonPlayer WHERE id={}".format(playerId)
            c.execute(query)
            conn.commit()

            conn.close()
            print('vip added sucessfully')
            return True
        else:
            print("player is not a common player!")
            return False
    else:
        print("player with derived name: {} does not exists in database".format(name))
        return False

#pass
def degradateToCommon(name):
    playerId = __getPlayerIdByName__(name)
    conn = sqlite3.connect('db.sqlite3')

    if playerId!= None:
        c = conn.cursor()
        query =  "Select id From VipPlayer Where id ={}".format(playerId)
        c.execute(query)
        conn.commit()
        p = c.fetchone()
        if p != None:

            c = conn.cursor()
            query =  "INSERT INTO CommonPlayer (id, isBanned) VALUES({},{})".format(playerId, 0)
            c.execute(query)
            conn.commit()

            c = conn.cursor()
            query =  "DELETE FROM VipPlayer WHERE id={}".format(playerId)
            c.execute(query)
            conn.commit()

            conn.close()
            print('degradation finished sucessfully')

            return True
        else:
            print("player with derived name: {} is not a Vip Player".format(name))
            return False
    else:
        print("player with derived name: {} does not exists in database".format(name))
        return False

#pass
def SetPlayerBanition(name, ban):
    playerId= __getPlayerIdByName__(name)
    if playerId != None:
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        query =  "SELECT isBanned from CommonPlayer Where Id ={}".format(playerId)
        c.execute(query)
        conn.commit()
        p = c.fetchone()
        if p != None:
            if p[0]!=ban:
                c = conn.cursor()
                query =  "Update CommonPlayer Set isBanned = {} Where Id ={} ".format(ban,playerId)
                c.execute(query)
                conn.commit()
                conn.close()
                print("player named {} has ban status: {}".format(name,ban))
                return True
            else:
                conn.close()
                print("player named {} has already ban status: {}".format(name,ban))
                return False
        else:
            conn.close()
            print("player with derived name: {} does not exists in database for common players".format(name)) 
            return False
    else:
            print("player with derived name: {} does not exists in database".format(name))
            return False

#uncess
def getPlayerById(id):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    query =  "SELECT (name, health, email, points) FROM Player WHERE id={}".format(id)
    c.execute(query)
    p = c.fetchone()
    if(p != None):
        print(p)
        pClass = Player(p[0], p[1], p[2], p[3],p[4])
        conn.commit()
        conn.close
        return pClass
    conn.commit()
    conn.close
    return None

#pass
def getPlayerByName(name):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    query =  "SELECT id,name, health, email, points FROM Player WHERE name='{}'".format(name)
    c.execute(query)
    p = c.fetchone()
    if(p != None):
        print(p)
        pClass = Player(p[0], p[1], p[2], p[3],p[4])
        conn.commit()
        conn.close
        return pClass
    conn.commit()
    conn.close
    return None

#pass
def deletePlayerById(id):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    c.execute("DELETE FROM Player WHERE id='{}'".format(id))
    conn.commit()
    conn.close
    print("player deleted successfully")

#pass
def deletePlayerByName(name):
    id = __getPlayerIdByName__(name)
    conn = sqlite3.connect('db.sqlite3')

    c = conn.cursor()
    c.execute("DELETE FROM Player WHERE name='{}'".format(name))
    conn.commit()

    c = conn.cursor()
    c.execute("DELETE FROM CardsRelation WHERE idPlayer={}".format(id))
    conn.commit()
    
    conn.close
    print("player with name {} was deleted successfully".format(name))

#pass
def __getPlayerIdByName__(name):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    query =  "SELECT id FROM Player WHERE name='{}'".format(name)
    c.execute(query)
    p = c.fetchone()
    conn.commit()
    conn.close()
    if p!=None:
        return p[0]
    return None

#pobieranie id kart, które ma player
def getPlayerCards(id):
    conn = sqlite3.connect('db.sqlite3')
    c = conn.cursor()
    query = " SELECT idCard FFROM CardsRelation WHERE idPlayer='{}'".format(id)
    c.execute(query)
    p = c.fetchall()
    conn.commit()
    conn.close()
    if p!=None:
        return p[0]
    return None