import React, { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import socketIOClient from 'socket.io-client'
import Game from '../../Game/Game'
import './GamePage.css'
import NewGameStore from '../../Store/NewGameStore'
import { Cell, colors } from '../../Game/Field'
import Modal from '../Modal/Modal'
import IGame from '../../Game/types'
import SettingsStore from '../../Store/SettingsStore'

const GamePage = () => {
    let emptySvgList : Array<React.SVGProps<SVGRectElement>> = []
    let [size, setSize] = useState([window.innerWidth, window.innerHeight]) 
    let canvasRef = useRef<HTMLCanvasElement>(null)
    let svgRef = useRef(null)
    let [moves, setMoves] = useState(0)
    let [svgList, setSvgList] = useState(emptySvgList)
    let [update, setUpdate] = useState(0)
    let [gameOver, setGameOver] = useState(false)

    const newGameStore = NewGameStore.useContainer()
    const lang = SettingsStore.useContainer().lang

    let [modalBodyData, setModalBodyData] = useState(modaldata.win[lang])

    let socket : SocketIOClient.Socket | undefined = undefined

    if(newGameStore.gameType === 2) {
        socket = socketIOClient(process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:8000')
    }

    let [game, setGame] = useState<IGame | undefined>(undefined)

    useEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight])
        }
        let currentGameStr = localStorage.getItem('CUURENT_GAME_TILER_4_0')
        let currentGame = currentGameStr ?  JSON.parse(currentGameStr) : null
        if(currentGame !== null) {
            setGame(new Game({
                type: '0',
                game: currentGame,
            }))
            setMoves(moves + 1)
        } else {
            redirect()
        }

        window.addEventListener('resize', updateSize)

        console.log(game)

        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    let hw = game ? game.field.size.x / game.field.size.y : 1

    console.log(size)
    
    let fieldWidth = size[1]
    let fieldHeight = fieldWidth * hw

    if(size[1] < size[0]) {
        fieldHeight = window.innerHeight * 5
        fieldWidth = fieldHeight * hw
    }

    //let field = new Field(0, 1, 9, 0)

    const updateField = () => {
        let w = fieldWidth
        let h = fieldHeight

        console.log('start')

        let svgListCopy = emptySvgList

        let invert = {
            x: false,
            y: false
        }
        
        if(game) {
            if (w < h) { 
                game.field.data.forEach((cell : Cell, i : number) => {
                    let x = cell.coord.y * w + cell.size.y * w * 0.01
                    let y = cell.coord.x * h + cell.size.x * h * 0.01
                    let width = cell.size.y * w * 0.98
                    let height = cell.size.x * h * 0.98
                    if(invert.x) x = w - x - width 
                    if(invert.y) y = h - y - height 

                    svgListCopy.push(
                        <rect 
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            fill={cell.who === -1 ? colors[cell.color] : colors[game ? game.players[cell.who].color : 0]}
                            rx={cell.size.x * w * 0.15}
                            ry={cell.size.y * h * 0.15}
                            stroke='black'
                            strokeWidth={cell.who === -1 ? 0 : cell.size.x * w * 0.03}
                        />
                    )
                })
            } else {
                game.field.data.forEach((cell : Cell, i : number) => {
                    let x = cell.coord.x * w + cell.size.x * w * 0.01
                    let y = cell.coord.y * h + cell.size.y * h * 0.01
                    let width = cell.size.x * w * 0.98
                    let height = cell.size.y * h * 0.98
                    if(invert.x) x = w - x - width 
                    if(invert.y) y = h - y - height 

                    svgListCopy.push(
                        <rect 
                            x={x}
                            y={y}
                            width={width}
                            height={height}
                            fill={cell.who === -1 ? colors[cell.color] : colors[game ? game.players[cell.who].color : 0]}
                            rx={cell.size.x * w * 0.15}
                            ry={cell.size.y * h * 0.15}
                            stroke='black'
                            strokeWidth={cell.who === -1 ? 0 : cell.size.x * w * 0.03}
                        />
                    )
                })
            }
        }

        console.log(svgListCopy)

        setSvgList(svgListCopy)
        setUpdate(update + 1)
    }


    useEffect(() => {
        if(game) {
            localStorage.setItem('CUURENT_GAME_TILER_4_0', JSON.stringify(game))
        }

        if(game && game.gameOver()) {
            setModalBodyData(game.winner() === 0 ? modaldata.win[lang] : modaldata.lost[lang])
            localStorage.removeItem('CUURENT_GAME_TILER_4_0')
        }

        setGameOver(game ? game.gameOver() : false)

        updateField()
    }, [size, moves, game])

    const redirect = () => {
        console.log('redirect')
        window.location.href = '/'
    }

    console.log(game)

    if(game) {
        console.log(game.winner())
        console.log(modalBodyData)
        return (
            <div className='game-page-main'>
                {gameOver ? <Modal show={gameOver} onHide={redirect}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modaldata.header[lang]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {console.log(modalBodyData)}
                        <p>{modalBodyData}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Button>OK</Modal.Button>
                    </Modal.Footer>
                </Modal> : null }
                <div className='game-header'>
                    <div className='game-field-heder-color' style={{backgroundColor: colors[game.players[0].color], opacity: game.move === 0 ? 1 : 0.3}}/>
                    <span>{game.players[0].countPoints} : {game.players[1].countPoints}</span>
                    <div className='game-field-heder-color' style={{backgroundColor: colors[game.players[1].color], opacity: game.move === 1 ? 1 : 0.3}}/>
                </div>
                <div className='game-field-main' >
                    <div className='game-field' >
                        <TransformWrapper options={{maxScale: 10}}>
                            <TransformComponent>
                                <svg ref={svgRef}
                                    viewBox={`0 0 ${fieldWidth} ${fieldHeight}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {svgList}
                                </svg>
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                </div>
                <div className={game.move === game.playerID ? 'color-picker-main-0' : 'color-picker-main-1'}>
                    <div className='color-picker'>
                        {colors.slice(0, game.countColors).map((color, idx) => {
                            if (idx === game?.players[0].color || idx === game?.players[1].color) {
                                return null
                            }
                            return (
                                <div key={idx} onClick={() => {console.log(idx); game?.Move(idx); setMoves(++moves)}} className='color-button' style={{backgroundColor: color}}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    return <></>
}


interface HashTable<T> {
    [key: string] : T
}


const modaldata : HashTable<HashTable<string>> = {
    header: {
        'en': 'Game over',
        'ru': 'Игра окончена'
    },
    win: {
        'en': 'You won',
        'ru': 'Вы выиграли'
    },
    lost: {
        'en': 'You lost',
        'ru': 'Вы проиграли'
    }
}

export default GamePage