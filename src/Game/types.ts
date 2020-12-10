import {IField} from "./Field"

export enum Languages {
    ENGLISH,
    RUSSIAN
}

export  const langNames = [
    'English', 'Русский'
]

export enum GameTYpes {
    MULTIPLAYER,
    SINGLEPLAYER,
}

export const gameTypesNames : Array<Array<string>> = [
    ['Multiplayer', 'Мультиплеер'],
    ['Singleplayer', 'Одиночная игра'],
]


export enum BotLevels {
    EASY,
    MEDIUM,
}

export const botLevelsNames : Array<Array<string>> = [
    ['Easy', 'Легкий'],
    ['Medium', 'Средний']
]

export interface PlayerState {
    countPoints: number,
    front: Array<number>,
    color: number,
    startsCells: Array<number>
}

export interface IGame {
    field: IField,
    typeGame: number,
    botLevel: number,
    players: Array<PlayerState>,
    move: number,
    countColors: number,
    seed: string,
    gameOver: () => boolean,
    Move : (color : number) =>  void,
    testMove?: (color: number) => number
    state?: () => IGame
}

export default IGame
