import { randInt } from './Fields/Box'
import Game from './Game'
import {IGame} from './types'

class Bot {
    private move_level_0 = (playerID : number, game : IGame) : number => {
        let color = randInt(0, game.countColors - 1)
        while (color === game.players[0].color || color === game.players[1].color) {
            color = randInt(0, game.countColors - 1)
        }
        return color
    }

    private move_level_1 = (playerID : number, game : IGame) : number => {
        let bestColor = 0
        let bestColorCost = -1
        for(let i = 0; i < game.countColors; i++) {
            if(i === game.players[0].color || i === game.players[1].color) {
                continue
            }
            let cost = game.testMove? game.testMove(i) : -1
            console.log('bot move', i, cost)
            // let cost = game1.players[playerID].countPoints - game.players[playerID].countPoints
            if(cost > bestColorCost) {
                bestColorCost = cost
                bestColor = i
            }
        }
        return bestColor
    }

    move = (playerID : number, game : IGame) : number => {
        switch(game.botLevel) {
            case 1 : return this.move_level_1(playerID, game)
            default : return this.move_level_0(playerID, game)
        }
    }
}

export default Bot