import Box, { BoxtStartCells, IResGen } from "./Fields/Box"

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
}

export interface IFieldConfig {
    name: Array<string>,
    sizes: Array<{x: number, y: number}>,
    generatorFunction(size: {x: number, y: number}, startPointsType : number, countColors: number) : IResGen,
    startCells: Array<Array<string>>,
}

export const fields : Array<IFieldConfig> = [
    {
        name: ['Classic', 'Классический'],
        sizes: [{x: 15, y: 9}, {x: 25, y: 15}, {x: 40, y: 24}, {x: 50, y: 30}, {x: 75, y: 45}],
        startCells: BoxtStartCells,
        generatorFunction: Box,
    }
]

export interface FieldProps {
    fieldType: number, 
    fieldSize: number, 
    countColors: number, 
    startCellsType: number
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

    constructor(props : FieldProps = defaultFielsProps) {
        if(props.fieldType >= fields.length) props.fieldType = 0
        if(props.fieldSize >= fields[props.fieldType].sizes.length) props.fieldSize = 0
        if(props.startCellsType >= fields[props.fieldType].startCells.length) props.startCellsType = 0
        
        console.log(props.fieldType, props.fieldSize, props.countColors, props.startCellsType)

        this.size = fields[props.fieldType].sizes[props.fieldSize]
        let {data, startCells} = fields[props.fieldType].generatorFunction(this.size, props.startCellsType, props.countColors)
        this.data = data
        this.startCells = startCells
    }
}

export default Field