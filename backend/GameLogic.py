import PlayerDataMapper
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

def putCardInSlot(sid, cardName, slotNumber):
    #chceck czy gracz ma taką kartę czy nie oszukuje
    #check czy ma wystarczającą mane
    #wrzuca karte na slot, zwraca sloty gracza w formie {'slot1': [nazwKart], 'slot2':...}
    pass

def endOfRound(sid, playerName, gameId):
    pass