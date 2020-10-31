import Field from "./Field";
import IGame from "./types";

export interface GamePropsFromSettings {
    typeGame: number,
    botLevel: number,
    fieldType: number,
    countColors: number,
    fieldSize: number,
    startPointsType: number
}

export interface GamePropsFromGame {
    game: IGame,
}

class Game implements IGame {
    field = new Field()
    typeGame = 0
    botLevel = 0
    players = []
    move = 0
    countColors = 4

    constructor(props: GamePropsFromSettings) {
        this.typeGame = props.typeGame
        this.botLevel = props.botLevel
        this.countColors = props.countColors
        this.field = new Field({
            fieldType: props.fieldType,
            fieldSize: props.fieldSize,
            countColors: this.countColors,
            startCellsType: props.startPointsType,
        })
    }
}

export default Game