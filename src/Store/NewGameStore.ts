import React, { useEffect, useState } from 'react'
import { createContainer } from 'react-gstore'

// function saveToLocalStorage() {
//     return (target: Object, propertyName: string, descriptor: any) => {
//         const method = descriptor.value;
//         descriptor.value = function(...args : any[]) {
//             console.log(args)
//             let str = localStorage.getItem(propertyName)
//             let abc = str ? JSON.parse(str) : null
//             const result = method.apply(this, abc ? [abc] : args);
//             console.log(propertyName)
//             localStorage.setItem(propertyName, JSON.stringify(result)) 
//             return result;
//         };
//     };
// }

const defaultState = {gameType: 0, countColors: 5, fieldType: 0, startCellsType: 0, fieldSize: 0, botLevel: 0, seed: undefined}

// class NewGameStore {
//     @saveToLocalStorage()
//     useNeGame(initialState = defaultState) {
//         let [gameType, setGameType] = useState(initialState.gameType ? initialState.gameType : defaultState.gameType)
//         let [fieldType, setFieldType] = useState(initialState.fieldType ? initialState.fieldType : defaultState.fieldType)
//         let [countColors, setCountColors] = useState(initialState.countColors ? initialState.countColors : defaultState.countColors)
//         let [startCellsType, setStartCellsType] = useState(initialState.startCellsType ? initialState.startCellsType : defaultState.startCellsType)
//         let [fieldSize, setFieldSize] = useState(initialState.fieldSize ? initialState.fieldSize : defaultState.fieldSize)
//         let [botLevel, setBotLevel] = useState(initialState.botLevel ? initialState.botLevel : defaultState.botLevel)
//         let [seed, setSeed] = useState(initialState.seed ? initialState.seed : defaultState.seed)

//         useEffect(() => {
//             setStartCellsType(defaultState.startCellsType)
//             setFieldSize(defaultState.fieldSize)
//         }, [fieldType])

//         return {
//             gameType, setGameType, 
//             fieldType, setFieldType, 
//             countColors, setCountColors, 
//             startCellsType, setStartCellsType,
//             fieldSize, setFieldSize,
//             botLevel, setBotLevel,
//             seed, setSeed,
//         } 
//     }
// }

const useNewGame = (initialState = defaultState) => {
    let [gameType, setGameType] = useState(initialState.gameType ? initialState.gameType : defaultState.gameType)
    let [fieldType, setFieldType] = useState(initialState.fieldType ? initialState.fieldType : defaultState.fieldType)
    let [countColors, setCountColors] = useState(initialState.countColors ? initialState.countColors : defaultState.countColors)
    let [startCellsType, setStartCellsType] = useState(initialState.startCellsType ? initialState.startCellsType : defaultState.startCellsType)
    let [fieldSize, setFieldSize] = useState(initialState.fieldSize ? initialState.fieldSize : defaultState.fieldSize)
    let [botLevel, setBotLevel] = useState(initialState.botLevel ? initialState.botLevel : defaultState.botLevel)
    let [seed, setSeed] = useState(initialState.seed ? initialState.seed : defaultState.seed)

    useEffect(() => {
        setStartCellsType(defaultState.startCellsType)
        setFieldSize(defaultState.fieldSize)
    }, [fieldType])

    return {
        gameType, setGameType, 
        fieldType, setFieldType, 
        countColors, setCountColors, 
        startCellsType, setStartCellsType,
        fieldSize, setFieldSize,
        botLevel, setBotLevel,
        seed, setSeed,
    } 
}

export default createContainer(useNewGame, true, {name: 'NEW_GAME_STORE', prefix: 'TILER_'})