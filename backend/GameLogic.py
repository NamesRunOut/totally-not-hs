import PlayerDataMapper
import CardDataMapper
import numpy as np
import pandas as pd
import random
#Repository
players = pd.DataFrame(columns = ['gameId', 'id', 'sid','points','mana','round'])
gameSlots = pd.DataFrame(columns = ['gameId', 'PlayerID','slot','CardId'])

HighestGameID = 0

"""
def join(playerName, playerEmail,sid):
    #try get existing player
    p = PlayerDataMapper.getPlayerByName(playerName)
    if p is None:
        #if player not exists, create him
        PlayerDataMapper.addPlayer(playerName, 100, playerEmail, 0)
        #get player with his id
        p = PlayerDataMapper.getPlayerByName(playerName)


    print("player {} joined".format(p.name))
    global players
    global HighestGameID
    playerInNewestGame =  np.array([])
    if not players.empty:
        playerInNewestGame = [x for x in players['gameId'] if x == HighestGameID]
        print(playerInNewestGame)
    if len(playerInNewestGame) == 0 :
        print("first player joined")
        players = players.append({"gameId": HighestGameID, "id": p.id, "sid": sid, "points": 0, "mana": 100,'round': 1},ignore_index=True)
        print(players)
        return {'canPlay': False, 'gameID': HighestGameID}
    else:
        print("second player joined")
        players = players.append({"gameId": HighestGameID, "id": p.id, "sid": sid, "points": 0, "mana": 100, 'round': 1},ignore_index=True)
        print(players)
        HighestGameID+=1
        return {'canPlay': True, 'gameID': HighestGameID-1}
"""





def join(playerName, playerEmail,sid):
    #try get existing player
    p = PlayerDataMapper.getPlayerByName(playerName)
    if p is None:
        #if player not exists, create him
        PlayerDataMapper.addPlayer(playerName, 100, playerEmail, 0)
        #get player with his id
        p = PlayerDataMapper.getPlayerByName(playerName)


    print("player {} joined".format(p.name))
    global players
    global HighestGameID
    playerInNewestGame =  np.array([])
    if not players.empty:
        playerInNewestGame = [x for x in players['gameId'] if x == HighestGameID]
        print("playerNewestgame " , playerInNewestGame)
    if len(playerInNewestGame) == 0 :
        print("first player joined")
        players = players.append({"gameId": HighestGameID, "id": p.id, "sid": sid, "points": 0, "mana": 100,'round': 1},ignore_index=True)
        players.drop_duplicates(subset=['sid', 'gameId'])
        print("players: ", players)
        return {'canPlay': False, 'gameID': HighestGameID}
    else:
        print("second player joined")
        players = players.append({"gameId": HighestGameID, "id": p.id, "sid": sid, "points": 0, "mana": 100, 'round': 1},ignore_index=True)
        players.drop_duplicates(subset=['sid', 'gameId'])
        print( players)
        HighestGameID+=1
        return {'canPlay': True, 'gameID': HighestGameID-1}

 
def beginOfRound(sid,  playerName, gameId):
    playerId = PlayerDataMapper.__getPlayerIdByName__(playerName)
    playerGames = players[players['id']==playerId]
    
    row = playerGames[playerGames['gameId'] == gameId]
    rowIndex = row.index.values.tolist()[0]
    row.at[rowIndex, 'round'] =+1
    if(row.at[rowIndex, 'round']%3==0):
        row.at[rowIndex, 'mana']=100
    global gameSlots
    gameSlots = pd.DataFrame(columns = ['gameId', 'PlayerID','slot','CardId'])
    #gameSlots = gameSlots.drop(gameSlots[(gameSlots.playerId == playerId) & (gameSlots.gameId == gameId)])
    cardIds = PlayerDataMapper.getPlayerCards(playerId)
    cardNames = list(map(lambda x: CardDataMapper.__getCardNameById__(x), cardIds))
    print(cardNames)
    return {'cards': cardNames, 'slot1': [], 'slot2': [], 'slot3': [], 'slot4': []}

def getCards(playerName):
    playerId = PlayerDataMapper.__getPlayerIdByName__(playerName)
    cardIds = PlayerDataMapper.getPlayerCards(playerId)
    cards = map(lambda x: CardDataMapper.getCardById(x), cardIds)
    cardsInfo = list(map(lambda x: x.getDict(), cards))
    #print(cardsInfo)
    return cardsInfo

def getAllCards():
    cardIds = CardDataMapper.getAllCardIds()
    cards = map(lambda x: CardDataMapper.getCardById(x), cardIds)
    cardsInfo = list(map(lambda x: x.getDict(), cards))
    #print(cardsInfo)
    return cardsInfo

#['gameId', 'PlayerID','slot','CardId'])
def putTestCardsToSlots():
    global gameSlots
    gameSlots = {'gameId': [0,0,0,0,0,0,0,0], 'PlayerID': [15, 15, 15, 15, 16, 16, 16, 16], 'slot': [1,2,3,4,1,2,3,4], 'CardId': [10, 11, 12, 13, 4, 7, 8, 9]}
    gameSlots = pd.DataFrame(data=gameSlots)
    HighestGameID = 0
    print(gameSlots)

def putCardInSlot(sid, cardId, slotNumber, gameId):
    print("AAAAAAAA")
    print(players)
    player = players[players['sid'] == sid]
    playerIndex = player.index.values.tolist()[0]
    #chceck czy gracz ma taką kartę czy nie oszukuje
    #cardId = CardDataMapper.__getCardIdByName__(cardName) 
    if(CardDataMapper.__checkIfRowIsInDb(player.at[playerIndex, 'id'], cardId)):
        return False
    #check czy ma wystarczającą mane
    if(player.at[playerIndex, 'mana'] < 1):
        return False
    #wrzuca karte na slot, zwraca sloty gracza w formie {'slot1': [nazwKart], 'slot2':...}
    player.at[playerIndex, 'mana'] -= 1
    new_card = [gameId, player.at[playerIndex,'id'], slotNumber, cardId]
    gameSlots.loc[len(gameSlots)] = new_card
    res = {}
    for i in range(1, 5):
        slot = gameSlots[(gameSlots['slot'] == i) & (gameSlots['PlayerID'] == player['id']) & (gameSlots['gameId'] == gameId)]
        slotName = "slot" + str(i)
        cardIds = slot['CardId'].tolist()
        arr = [CardDataMapper.__getCardNameById__(x) for x in cardIds]
        res[slotName] = arr
    
    return res

import random
def randomStart():
    i = random.randint(0, 2)
    if i == 0:
        return players.at[0, 'sid']
    else:
        return players.at[1, 'sid']

def endOfRound(sid, playerName, gameId):
    print("END OF ROUND")
    #ściąga informacje o graczu
    player = players[players['sid'] == sid]
    print("player: ", player)
    
    #ściąga informacje o przeciwniku gracza
    opponent = players[(players['gameId'] == gameId) & (players['sid'] != sid)]
    print("opponent: ", opponent)
    #ściąga informacje o kartach w slotach obu graczy
    playerId = list(player['id'])
    playerId = playerId[0]

    playerSlots = gameSlots[(gameSlots['gameId'] == gameId) & (gameSlots['PlayerID'] == playerId)]
    print("playerslots: ", playerSlots)
    opponentId = list(opponent['id'])
    opponentId = opponentId[0]
    opponentSlots = gameSlots[(gameSlots['gameId'] == gameId) & (gameSlots['PlayerID'] == opponentId)]
    print("opponentSlots: ", opponentSlots)
    opponentPoints = list(opponent['points'])
    opponentPoints = opponentPoints[0]
    print("opponent points: ", opponentPoints)
    #dla każdego slota
    for i in range(1,5):
        #ściąga kartę ze slotu
        playerSlot = playerSlots[playerSlots['slot'] == i]
        opponentSlot = opponentSlots[opponentSlots['slot'] == i]
        #pobiera info o kartach z bazy
        cardIdP = list(playerSlot['CardId'])[0]
        playerCard = CardDataMapper.getCardById(cardIdP)
        cardIdO = list(opponentSlot['CardId'])[0]
        opponentCard = CardDataMapper.getCardById(cardIdO)
        #karty walczą
        fightRes = cardsFight(playerCard.atk, playerCard.hp, opponentCard.atk, opponentCard.hp)
        #aktualizuje punkty gracza
        #punkty przeciwnika tylko liczy i zwraca, bo przeciwnik sam sobie zaktualizuje we własnym zapytaniu
        if fightRes == 'a':
            playerIndex = player.index.values.tolist()[0]
            player.at[playerIndex, 'points'] += 1
        else:
            opponentPoints += 1

    #sprawdza wynik dla gracza z sid z argumentu
    playerIndex = player.index.values.tolist()[0]
    gameRes = 'none'
    if opponentPoints > 15:
        gameRes = 'loss'
    elif player.at[playerIndex, 'points'] > 15:
        gameRes = 'win'

    #wysyła info do gracza w formie {'wynik': win/loss/none, 'yourPoints': points, 'opponentPoints': points}
    return {'wynik': gameRes, 'yourPoints': player.at[playerIndex, 'points'], 'opponentPoints': opponentPoints}
    

def cardsFight(aAtk, aHp, bAtk, bHp):
    print("fight")
    while(aHp > 0 and bHp > 0):
            aHp -= bAtk
            bHp -= aAtk
    
    if aHp < 0 and bHp < 0:
        return 'r'
    elif aHp < 0:
        return 'b'
    else:
        return 'a'
