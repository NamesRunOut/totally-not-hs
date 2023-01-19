import socketio
import PlayerDataMapper
import CardDataMapper
import GameLogic
sio = socketio.Server(cors_allowed_origins=['*']) 
app = socketio.WSGIApp(sio,static_files={
    '/': './public/'
})
client_count = 0


@sio.event
def connect(sid, environ):
    print(sid,'connected')
    global client_count
    client_count+=1
    GameLogic.putTestCardsToSlots()
    #GameLogic.join('michal', 'sraczkowaty',sid)
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
# gamers = []
# last_id = 20
@sio.event
def join(sid, data):
    return GameLogic.join(data['name'], data['email'],sid)

#pobiera karty graczy dla zadanego id gry i zwraca na front
#dodaje manę
#inkrementuje runde
#opróżnia sloty
@sio.event
def beginRound(sid,data):
    return GameLogic.beginOfRound(sid,data['name'],data['gameId'])

#karty się biją itd...
#wynikiem ma być albo koniec gry tzn propka {'isFinished': True, 'isWinner' = True} do wygranego sida, natomiast do przegranego co innego...
@sio.event
def endOfRound(sid, data):
    return GameLogic.endOfRound(sid,data['name'],data['gameId'])

#wrzuca kartę o zadanej nazwie i zwraca sloty usera z wypełnione odpowiednio, zmniejsza mane gracza, uwaga jak ma za mało many to operacja nie powinna się powieść, zwróćmy wtedy false
@sio.event
def putCardInSlot(sid, data):
    return GameLogic.putCardInSlot(sid,data['cardName'],data['slotNumber'], data['gameId'])



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



