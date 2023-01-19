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
    playerGames = players[players['playerId']==playerId]
    row = playerGames[playerGames['gameID'] == gameId].value[1]
    row['round'] =+1
    if(row['round']%3==0):
        row['mana']=100
    gameSlots = gameSlots.drop(gameSlots[gameSlots.playerId == playerId & gameSlots.gameId == gameId])
    cardIds = PlayerDataMapper.getPlayerCards(playerId)
    cardNames = map(lambda x: CardDataMapper.__getCardNameById__(x), cardIds)
    return {'cards': cardNames, 'slot1': [], 'slot2': [], 'slot3': [], 'slot4': []}




def putCardInSlot(sid, cardName, slotNumber, gameId):
    player = players[players['sid'] == sid]
    print("AAAAAAAAAAAAAAAAAAAAAAA")
    print("player: ", player)
    #chceck czy gracz ma taką kartę czy nie oszukuje
    cardId = CardDataMapper.__getCardIdByName__(cardName) 
    if(CardDataMapper.__checkIfRowIsInDb(player.at[0, 'id'], cardId)):
        return False
    #check czy ma wystarczającą mane
    if(player.at[0, 'mana'] < 1):
        return False
    #wrzuca karte na slot, zwraca sloty gracza w formie {'slot1': [nazwKart], 'slot2':...}
    player.at[0, 'mana'] -= 1
    new_card = [gameId, player.at[0,'id'], slotNumber, cardId]
    gameSlots.loc[len(gameSlots)] = new_card
    res = {}
    for i in range(1, 5):
        slot = gameSlots[(gameSlots['slot'] == i) & (gameSlots['PlayerID'] == player['id']) & (gameSlots['gameId'] == gameId)]
        slotName = "slot" + str(i)
        cardIds = slot['CardId'].tolist()
        arr = [CardDataMapper.__getCardNameById__(x) for x in cardIds]
        res[slotName] = arr
    
    return res



def endOfRound(sid, playerName, gameId):
    #ściąga informacje o graczu
    player = players[players['sid'] == sid].value[1]
    #ściąga informacje o przeciwniku gracza
    opponent = players[players['gameId'] == gameId and players['sid'] != sid].value[1]
    #ściąga informacje o kartach w slotach obu graczy
    playerSlots = gameSlots[gameSlots['gameId'] == gameId and gameSlots['playerID'] == player['id']]
    opponentSlots = gameSlots[gameSlots['gameId'] == gameId and gameSlots['playerID'] == opponent['id']]
    
    opponentPoints = opponent['points']
    #dla każdego slota
    for i in range(1,5):
        #ściąga kartę ze slotu
        playerSlot = playerSlots[playerSlots['slot'] == i].value[1]
        opponentSlot = opponentSlots[opponentSlots['slot'] == i].value[1]
        #pobiera info o kartach z bazy
        playerCard = CardDataMapper.__getCardNameById__(playerSlot['CardId'])
        opponentCard = CardDataMapper.__getCardNameById__(opponentSlot['CardId'])
        #karty walczą
        fightRes = cardsFight(playerCard.atk, playerCard.hp, opponentCard.atk, opponentCard.hp)
        #aktualizuje punkty gracza
        #punkty przeciwnika tylko liczy i zwraca, bo przeciwnik sam sobie zaktualizuje we własnym zapytaniu
        if fightRes == 'a':
            player['points'] += 1
        else:
            opponentPoints += 1

    #sprawdza wynik dla gracza z sid z argumentu
    gameRes = 'none'
    if opponentPoints > 15:
        gameRes = 'loss'
    elif player['points'] > 15:
        gameRes = 'win'

    #wysyła info do gracza w formie {'wynik': win/loss/none, 'yourPoints': points, 'opponentPoints': points}
    return {'wynik': gameRes, 'yourPoints': player['points'], 'opponentPoints': opponentPoints}
    

def cardsFight(aAtk, aHp, bAtk, bHp):
    while(aHp > 0 and bHp > 0):
            aHp -= bAtk
            bHp -= aAtk
    
    if aHp < 0 and bHp < 0:
        return 'r'
    elif aHp < 0:
        return 'b'
    else:
        return 'a'
