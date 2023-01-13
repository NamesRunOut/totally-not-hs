import PlayerDataMapper
import CardDataMapper
import numpy as np
import pandas as pd
#Repository
players = pd.DataFrame(columns = ['gameId', 'id', 'sid','points','mana','round'])
gameSlots = pd.DataFrame(columns = ['gameId', 'PlayerID','slot','CardId'])

HighestGameID = 0

def endOfRound():
    pass

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
    


def beginOfRound(sid, playerName, gameId):
    playerId = PlayerDataMapper.__getPlayerIdByName__(playerName)
    playerGames = players[players['playerId']==playerId]
    row = playerGames[playerGames['gameID'] == gameId].value[1]
    row['round'] =+1
    if(row['round']%3==0):
        row['mana']=100
    gameSlots = gameSlots.drop(gameSlots[gameSlots.playerId == playerId & gameSlots.gameId == gameId])
    #TODO: wysłać karty gracza
    return True

def putCardInSlot(sid, cardName, slotNumber, gameId):
    player = players[players['sid'] == sid].value[1]
    #chceck czy gracz ma taką kartę czy nie oszukuje
    cardId = CardDataMapper.__getCardIdByName__(cardName) 
    if(CardDataMapper.__checkIfRowInDb(player['id'], cardId)):
        return False
    #check czy ma wystarczającą mane
    if(player['mana'] < 1):
        return False
    #wrzuca karte na slot, zwraca sloty gracza w formie {'slot1': [nazwKart], 'slot2':...}
    player['mana'] -= 1
    new_card = [gameId, player['id'], slotNumber, cardId]
    gameSlots.loc[len(gameSlots)] = new_card
    res = {}
    for i in range(4):
        slot = gameSlots[gameSlots['slot'] == i and gameSlots['PlayerID'] == player['id'] and gameSlots['gameId'] == gameId]
        slotName = "slot" + str(i)
        cardIds = slot['cardId'].tolist()
        arr = [CardDataMapper.__getCardNameById__(x) for x in cardIds]
        res[slotName] = arr
    
    return res



def endOfRound(sid, playerName, gameId):
    pass