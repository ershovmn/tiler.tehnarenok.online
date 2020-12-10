import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { fields } from '../../Game/Field'
import NewGameStore from '../../Store/NewGameStore'
import SettingsStore from '../../Store/SettingsStore'
import './Home.scss'
import Game from '../../Game/Game'

const Home = () => {
    // let lang = langs[1].id
    const {lang, devMode} = SettingsStore.useContainer()
    const store = NewGameStore.useContainer()

    let gameStr : string | null = localStorage.getItem('CUURENT_GAME_TILER_4_0')
    let game : boolean = gameStr ? true : false

    const gameParams : Array<{name: HashTable<string>, values: Array<number>, names?: Array<HashTable<string>>, value: number, setValue: Dispatch<SetStateAction<number>>}> = [
        {
            name: {'en': 'Game type', 'ru': 'Тип игры'},
            values: [0, 1, 2],
            names: [
                {'en': 'Solo', 'ru': 'Одиночная игра'},
                {'en': 'Multiplayer offline', 'ru': 'Мульплеер оффлайн'},
                // {'en': 'Multiplayer online', 'ru': 'Мультиплеер онлайн'},
            ],
            value: store.gameType,
            setValue: store.setGameType,
        },
        {
            name: {'en': 'Count colors', 'ru': 'Колличество цветов'},
            values: [5, 6, 7, 8, 9, 10, 11],
            value: store.countColors,
            setValue: store.setCountColors,
        },
        {
            name: {'en': 'Field type', 'ru': 'Тип игрового поля'},
            values: [0],
            names: [
                {'en': 'Classic', 'ru': 'Классическое поле'},
            ],
            value: store.fieldType,
            setValue: store.setFieldType,
        },
        {
            name: {'en': 'Field size', 'ru': 'Размер игрового поля'},
            values: fields[store.fieldType].sizes.map((item, idx) => idx),
            names: fields[store.fieldType].sizes.map(item => {return {'ru': `${item.x}x${item.y}`, 'en': `${item.x}x${item.y}`}}),
            value: store.fieldSize,
            setValue: store.setFieldSize,
        },
        {
            name: {'en': 'Start cells stype', ru: 'Тип начальных точек'},
            values: fields[store.fieldType].startCells.map((item, idx) => idx),
            names: fields[store.fieldType].startCells,
            value: store.startCellsType,
            setValue: store.setStartCellsType,
        }
    ]

    if(store.gameType === 0) {
        gameParams.splice(1, 0, {
            name: {'en': 'Bot type', 'ru': 'Тип бота'},
            values: [0, 1],
            names: [
                {'ru': 'Простой', 'en': 'Easy'},
                {'ru': 'Средний', 'en': 'Medium'},
            ],
            value: store.botLevel,
            setValue: store.setBotLevel
        })
    }

    let buttonNewGameName : HashTable<string> = {'en': 'New game', 'ru': 'Новая игра'}
    let buttonContinueGame : HashTable<string> = {'en': 'Continue game', 'ru': 'Продолжить игру'}
    
    let localConnection = new RTCPeerConnection()
    let sendChannel = localConnection.createDataChannel('sendChannel')
    sendChannel.onopen = () => console.log('open')
    sendChannel.onclose = () => console.log('close' )

    useEffect(() => {
        fetch('/api', {credentials: 'same-origin'})
            .then(res => console.log(res))
    }, [])

    return (
        <div className='home-main'>
            <header>
                <h1>Tiler 4.0</h1>
                <a href='/settings'><img src={require('../../img/settings.svg')} alt='settings'/></a>
            </header>
            {gameParams.map((param, idx) => {
                return (
                    <div>
                        <h2>{param.name[lang]}</h2>
                        <select value={param.value} onChange={(e) => param.setValue(parseInt(e.target.value))}>
                            {param.names ? param.names.map((name, idx) => <option value={param.values[idx]}>{name[lang]}</option>) : 
                                param.values.map((name, idx) => <option value={name}>{name}</option>)}
                        </select>
                    </div>
                )
            })}
            <div className='home-page-buttons'>
                <a onClick={
                    () => localStorage.setItem('CUURENT_GAME_TILER_4_0', JSON.stringify(new Game({
                        typeGame: store.gameType,
                        botLevel: store.botLevel,
                        fieldType: store.fieldType,
                        countColors: store.countColors,
                        fieldSize: store.fieldSize,
                        startPointsType: store.startCellsType,
                        type: '1',
                        seed: store.seed
                    })))
                } href='/game'>
                    <div className='my-button'>
                        {buttonNewGameName[lang]}
                    </div>
                </a>
                {game ? 
                    <a href='/game'>
                        <div className='my-button'>
                            {buttonContinueGame[lang]}
                        </div>
                    </a> : null 
                }
            </div>
        </div>
    )
}

interface HashTable<T> {
    [key: string] : T
}


export default Home