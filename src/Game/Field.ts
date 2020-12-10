import { Hash } from "crypto"
import Box, { BoxtStartCells, IResGen, randInt } from "./Fields/Box"
import * as randomSeed from 'random-seed'

let rand = randomSeed.create()

export const colors = [
    '#026d35',
    '#5b23a4',
    '#05f0e4',
    '#e30000',
    '#ff3ac2',
    '#fd791a',
    '#1c9bfd',
    '#dde026',
    '#08b35c',
    '#b8b8b8',
    '#bb92fc',
]

export interface Cell {
    coord: {
        x: number,
        y: number,
    },
    who: number,
    color: number,
    size: {
        x: number,
        y: number,
    },
    neighbors: Array<number>,
}

export interface IField {
    size: {x: number, y: number},
    data: Array<Cell>,
    startCells: Array<Array<number>>,
    seed: string
}


interface HashTable<T> {
    [key: string] : T
}

export interface IFieldConfig {
    name: HashTable<string>,
    sizes: Array<{x: number, y: number}>,
    generatorFunction(size: {x: number, y: number}, startPointsType : number, countColors: number, random : (n : number) => number) : IResGen,
    startCells: Array<HashTable<string>>,
}

export const fields : Array<IFieldConfig> = [
    {
        name: {'en': 'Classic', 'ru': 'Классический'},
        sizes: [{x: 15, y: 9}, {x: 25, y: 15}, {x: 40, y: 24}, {x: 50, y: 30}, {x: 75, y: 45}],
        startCells: BoxtStartCells,
        generatorFunction: Box,
    }
]

export interface FieldProps {
    fieldType: number, 
    fieldSize: number, 
    countColors: number, 
    startCellsType: number,
    seed?: string
}

const defaultFielsProps : FieldProps = {
    fieldType: 0,
    fieldSize: 0,
    countColors: 4,
    startCellsType: 0,
}

class Field implements IField {
    data : Array<Cell> = []
    size = {x: 0, y: 0}
    startCells : Array<Array<number>> = [[]]
    seed = ''

    constructor(props : FieldProps = defaultFielsProps) {
        if(props.fieldType >= fields.length) props.fieldType = 0
        if(props.fieldSize >= fields[props.fieldType].sizes.length) props.fieldSize = 0
        if(props.startCellsType >= fields[props.fieldType].startCells.length) props.startCellsType = 0
        
        this.seed = props.seed ? props.seed : rand.string(25)

        rand.seed(this.seed)

        let random = (n : number) => rand.intBetween(0, n)

        this.size = fields[props.fieldType].sizes[props.fieldSize]
        let {data, startCells} = fields[props.fieldType].generatorFunction(this.size, props.startCellsType, props.countColors, random)
        this.data = data
        this.startCells = startCells 

        let colorPlayers : Array<number> = [random(props.countColors - 1), random(props.countColors - 1)]

        while (colorPlayers[0] === colorPlayers[1]) {
            colorPlayers[1] = random(props.countColors - 1)
        }

        this.startCells.forEach((item, idx) => {
            item.forEach(point => {
                this.data[point].color = colorPlayers[idx]
            }) 
        })

        this.startCells.forEach(scp => {
            let front : Array<number> = []
            scp.forEach(startCell => {
                front = front.concat(this.data[startCell].neighbors)
            })

            front.forEach(point => {
                while (this.data[point].color === colorPlayers[0] || this.data[point].color === colorPlayers[1]) {
                    this.data[point].color = random(props.countColors - 1)
                }
            })
        });
    }
}

export default Field