import socketio
import PlayerDataMapper
import CardDataMapper
sio = socketio.Server() 
app = socketio.WSGIApp(sio,static_files={
    '/': './public/'
})
client_count = 0


@sio.event
def connect(sid, environ):
    print(sid,'connected')
    global client_count
    client_count+=1
    #CardDataMapper.DeleteCard('card6')
    #CardDataMapper.AssignCardFor('kitku','card4')
    #CardDataMapper.CreateCard('new card','from python sever','si',22,33)
    #PlayerDataMapper.deletePlayerByName('mojvip')
    #PlayerDataMapper.addPlayer('mojvip',98,'viptop1@test',99,True,99)
    #PlayerDataMapper.becomeVip('maju',500)
    #PlayerDataMapper.degradateToCommon('maju')
    #PlayerDataMapper.SetPlayerBanition('XD',1)

    sio.emit('client_count',client_count)


#######################################Logika gry endpoints
rundy = 0
gamers = []
last_id = 20

##co z id bo to int
@sio.event
def join(sid, data):
    print(data)
    name = data['name']
    p = PlayerDataMapper.getPlayerByName(name)
    if p is None:
        global last_id
        id = last_id
        last_id+=1
        health = 20
        email = data['email']
        points = 0
        PlayerDataMapper.addPlayer(name, health, email, points)
        p = PlayerDataMapper.getPlayerByName(name)
    
    print("player {} joined".format(p.name))
    global gamers
    gamers.append({"id": p.id, "sid": sid})
    if len(gamers) == 2:
        sio.emit('message', "both gamers ready, we're starting")
    else:
        sio.emit('message', "one player ready")

    return "you're ready"







#add player###############################################
@sio.event
def addCommonPlayer(sid,data):
    print("client with id {} attempted to add a common player: {}".format(sid,data))
    return PlayerDataMapper.addPlayer(data['name'],data['health'],data['email'],data['points'])

@sio.event
def addVipPlayer(sid,data):
    print("client with id {} attempted to add a vip player: {}".format(sid,data))
    return PlayerDataMapper.addPlayer(data['name'],data['health'],data['email'],data['points'],True,data['bonus'])

##########################################################

# player vip / common ###############################################
@sio.event
def setVipToPlayer(sid, data):
    print("client with id {} attempted to set a vip status for player: {} with bonus: {}".format(sid,data['name'], data['bonus']))
    return PlayerDataMapper.becomeVip(data['name'],data['bonus'])

@sio.event
def degradateVipToCommon(sid,data):
    print("client with id {} attempted to degrate player: {} to common".format(sid,data['name']))
    return PlayerDataMapper.degradateToCommon(data['name'])

#player ban / unban ###############################################
@sio.event
def banUser(sid, data):
    print("client with id {} attempted to ban user: {}".format(sid,data['name']))
    PlayerDataMapper.SetPlayerBanition(data['name'],1)

@sio.event
def unbanUser(sid, data):
    print("client with id {} attempted to unban user: {}".format(sid,data['name']))
    PlayerDataMapper.SetPlayerBanition(data['name'],0)

####################################################################

# get player by name ###############################################
@sio.event
def getPlayerByName(sid,data):
    print("client with id {} attempted to get player {}".format(sid,data['name']))
    return PlayerDataMapper.getPlayerByName(data['name'])
####################################################################

# get player by id #################################################
@sio.event
def getPlayerById(sid,data):
    print("client with id {} attempted to get player with id {}".format(sid,data['id']))
    return PlayerDataMapper.getPlayerByName(data['id'])
####################################################################

# delete player by id #################################################
@sio.event
def deletePlayerById(sid,data):
    print("client with id {} attempted to remove player with id {}".format(sid,data['id']))
    return PlayerDataMapper.deletePlayerById(data['id'])
####################################################################

# delete player by name #################################################
@sio.event
def deletePlayerByName(sid,data):
    print("client with id {} attempted to remove player with name {}".format(sid,data['name']))
    return PlayerDataMapper.deletePlayerByName(data['name'])
####################################################################

# create card by name #################################################
@sio.event
def createCard(sid,data):
    print("client with id {} attempted to create a card {}".format(sid,data))
    return CardDataMapper.CreateCard(data['name'],data['description'],data['mana'],data['hp'],data['atk'])
####################################################################

# delete card by name #################################################
@sio.event
def deleteCard(sid,data):
    print("client with id {} attempted to remove a card {}".format(sid,data['name']))
    return CardDataMapper.DeleteCard(data['name'])
####################################################################

# Assign card to user #################################################
@sio.event
def assignCard(sid,data):
    print("client with id {} attempted to assign a card {} to user {}".format(sid,data['cardName'],data['userName']))
    return CardDataMapper.AssignCardFor(data['userName'], data['cardName'])
####################################################################

@sio.event
def disconnect(sid):
    global client_count
    client_count-=1
    print(sid,'disconnect')
    sio.emit('client_count',client_count)


@sio.event
def sum(sid,data):
    result = data['numbers'][0]+data['numbers'][1]
    print(sid," this is what was send by server and received from client: ",result)
    return result #callback



