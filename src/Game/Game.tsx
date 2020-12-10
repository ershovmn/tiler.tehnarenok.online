import { time } from "console";
import Bot from "./Bot";
import Field, { colors } from "./Field";
import IGame, { PlayerState } from "./types";


export interface GamePropsFromSettings {
    type: "1",
    typeGame: number,
    botLevel: number,
    fieldType: number,
    countColors: number,
    fieldSize: number,
    startPointsType: number,
    seed? : string
}

export interface GamePropsFromGame {
    type: "0",
    game: IGame,
}

class Game implements IGame {
    field : Field = new Field()
    typeGame : number = 0
    botLevel : number = 0
    players : Array<PlayerState> = []
    move : number = 0
    countColors : number = 4
    seed = ''

    constructor(props: GamePropsFromSettings | GamePropsFromGame) {
        if(props.type === "0") {
            this.typeGame = props.game.typeGame
            this.field = props.game.field
            this.botLevel = props.game.botLevel
            this.players = props.game.players
            this.move = props.game.move
            this.countColors = props.game.countColors
            this.seed = props.game.seed
            return
        }
        this.typeGame = props.typeGame
        this.botLevel = props.botLevel
        this.countColors = props.countColors
        this.field = new Field({
            fieldType: props.fieldType,
            fieldSize: props.fieldSize,
            countColors: this.countColors,
            startCellsType: props.startPointsType,
            seed: props.seed,
        })

        this.seed = this.field.seed

        this.field.startCells.forEach(scp => {
            let front : Array<number> = []
            let countPoints : number = 0
            let color : number = 0
            scp.forEach(startCell => {
                color = this.field.data[startCell].color
                countPoints += 1
                front = front.concat(this.field.data[startCell].neighbors)
            })
            let state : PlayerState = {
                startsCells: scp,
                front: front,
                color: color,
                countPoints: countPoints,
            }
            this.players.push(state)
        });
    }

    Move = (color : number) => {
        console.log("move")
        let playerID = this.move
        let front = this.players[playerID].front
        let countPoints : number = this.players[playerID].countPoints
        let newFront : Array<number> = []
        let queue : Array<number> = front
        while (queue.length > 0) {
            let item = queue.pop()
            if (item === undefined) continue
            if (this.field.data[item].color === color && this.field.data[item].who === -1) {
                countPoints += 1
                this.field.data[item].who = playerID
                queue = queue.concat(this.field.data[item].neighbors)
            } else {
                if (newFront.indexOf(item) === -1 && this.field.data[item].who === -1) {
                    newFront.push(item)
                }
            }
        }
        this.players[playerID].front = newFront
        this.players[playerID].color = color
        this.players[playerID].countPoints = countPoints
        this.move = (this.move + 1) % 2

        if(this.typeGame === 0 && playerID === 0) {
            let bot = new Bot()
            this.Move(bot.move(this.move, this))
        }
    }

    state = () => {
        return this
    }

    testMove = (color : number) : number => {
        console.log("test move?")
        let playerID = this.move
        let front = [...this.players[playerID].front]
        let countPoints : number = this.players[playerID].countPoints
        let prevCount : number = countPoints
        let newFront : Array<number> = []
        let queue : Array<number> = front
        let addedPoints : Array<number> = []
        console.log(this.players)
        while (queue.length > 0) {
            let item = queue.pop()
            if (item === undefined) continue
            console.log(item, this.field.data[item].color === color && this.field.data[item].who === -1 && addedPoints.indexOf(item) === -1)
            if (this.field.data[item].color === color && this.field.data[item].who === -1 && addedPoints.indexOf(item) === -1) {
                countPoints += 1
                addedPoints.push(item)
                queue = queue.concat(this.field.data[item].neighbors)
            } else {
                if (newFront.indexOf(item) === -1 && this.field.data[item].who === -1) {
                    newFront.push(item)
                }
            }
        }
        console.log(countPoints, prevCount)
        return countPoints - prevCount
    }

    gameOver = () => {
        if((this.field.size.x * this.field.size.y) / 2 <= this.players[0].countPoints) {
            return true
        }
        if((this.field.size.x * this.field.size.y) / 2 <= this.players[1].countPoints) {
            return true
        }
        return false
    }
}

export default Game