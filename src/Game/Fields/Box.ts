import { Cell } from "../Field";

export const randInt = (min : number, max : number) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

interface HashTable<T> {
    [key: string] : T
}

export const BoxtStartCells : Array<HashTable<string>> = [
    {'en': 'Diagonal', 'ru': 'Диагональ'},
    {'en': 'Side-toside', 'ru': 'Стороны'},
    {'en': 'Meeting', 'ru': 'Meeting'},
    {'en': 'Random 1', 'ru': 'Random 1'},
    //['Random 2', 'Random 2'],
]

export interface IResGen {
    data: Array<Cell>, 
    startCells: Array<Array<number>>
}

export default (size : {x : number, y: number}, startPointsType: number, countColors: number, random : (x : number) => number) : IResGen => {
    let data : Array<Cell> = []
    for(let i = 0; i < size.x; i++) {
        for(let j = 0; j < size.y; j++) {
            let neighbors = []
            if(i > 0 ) neighbors.push((i - 1) * size.y + j)
            if(i < size.x - 1) neighbors.push((i + 1) * size.y + j)
            if(j > 0 ) neighbors.push(i * size.y + j - 1)
            if(j < size.y - 1 ) neighbors.push(i * size.y + j + 1)

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
                color: random(countColors - 1),
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
            startCells.push([0, size.y * (size.x - 1)])
            startCells.push([size.y - 1, size.x * size.y - 1])
            break
        }
        case 2: {
            startCells.push([0, size.x * size.y - 1])
            startCells.push([size.y - 1, size.y * (size.x - 1)])
            break
        }
        case 3: {
            if(randInt(0, 1) === 1) {
                let a = random(size.y - 1)
                let b = size.y * size.x - 1 - a
                startCells.push([a])
                startCells.push([b])
            } else {
                let a = random(size.y - 1)
                let b = size.y * size.x - 1 - a
                startCells.push([a])
                startCells.push([b])
                
                // let a = randInt(0, size.x - 1)
                // let b = size.x * a - 1
                // startCells.push([a * size.y])
                // startCells.push([b])
            }
            break
        }
        default: {
            startCells.push([0])
            startCells.push([size.x * size.y - 1])
            break
        }
    }

    startCells.forEach((item, idx) => {
        item.forEach(point => {
            data[point].who = idx
        })
    })

    return {data, startCells}
}