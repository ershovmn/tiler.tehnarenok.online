import { Cell } from "../Field";

export const randInt = (min : number, max : number) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export const BoxtStartCells = [
    ['Diagonal', 'Диагональ'],
    ['Side-toside', 'Стороны'],
    ['Meeting', 'Meeting'],
    ['Random 1', 'Random 1'],
    //['Random 2', 'Random 2'],
]

export interface IResGen {
    data: Array<Cell>, 
    startCells: Array<Array<number>>
}

export default (size : {x : number, y: number}, startPointsType: number, countColors: number) : IResGen => {
    let data = []

    console.log(new Date())

    for(let i = 0; i < size.x; i++) {
        for(let j = 0; j < size.y; j++) {
            let neighbors = []
            if(i > 0 ) neighbors.push((i - 1) * size.y + j)
            if(i < 0 ) neighbors.push((i + 1) * size.y + j)
            if(j > 0 ) neighbors.push(i * size.y + j - 1)
            if(j < 0 ) neighbors.push(i * size.y + j + 1)

            let cell : Cell = {
                coord: {
                    x: (1.0 / size.x) * i,
                    y: (1.0 / size.y) * j,
                },
                size: {
                    x: (1.0 / size.x),
                    y: (1.0 / size.y),
                },
                who: -1,
                color: randInt(0, countColors - 1),
                neighbors: neighbors,
            }

            data.push(cell)
        }
    }

    let startCells : Array<Array<number>> = []

    switch (startPointsType) {
        case 0: {
            startCells.push([0])
            startCells.push([size.x * size.y - 1])
            break
        }
        case 1: {
            startCells.push([0, size.x * (size.y - 1)])
            startCells.push([size.y - 1, size.x * size.y - 1])
            break
        }
        case 2: {
            startCells.push([0, size.x * size.y - 1])
            startCells.push([size.y - 1, size.x * (size.y - 1)])
            break
        }
        case 3: {
            if(randInt(0, 1) === 1) {
                let a = randInt(0, size.y - 1)
                let b = size.y * size.x - 1 - a
                startCells.push([a])
                startCells.push([b])
            } else {
                let a = randInt(0, size.x - 1)
                let b = size.x * a - 1
                startCells.push([a * size.y])
                startCells.push([b])
            }
            break
        }
        default: {
            startCells.push([0])
            startCells.push([size.x * size.y - 1])
            break
        }
    }

    return {data, startCells}
}