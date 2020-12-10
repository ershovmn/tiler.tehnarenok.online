import React, { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import socketIOClient from 'socket.io-client'
import Game from '../../Game/Game'
import './GamePage.css'
import NewGameStore from '../../Store/NewGameStore'
import { Cell, colors } from '../../Game/Field'
import Modal from '../Modal/Modal'
import IGame from '../../Game/types'

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

    let socket : SocketIOClient.Socket | undefined = undefined

    if(newGameStore.gameType === 2) {
        socket = socketIOClient(process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:8000')
    }

    let [game, setGame] = useState<IGame | undefined>(undefined)/*new Game({
        typeGame: newGameStore.gameType,
        botLevel: newGameStore.botLevel,
        fieldType: newGameStore.fieldType,
        countColors: newGameStore.countColors,
        fieldSize: newGameStore.fieldSize,
        startPointsType: newGameStore.startCellsType,
        type: '1',
        seed: newGameStore.seed
    }))*/

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
        
        if(game) {
            if (w < h) { 
                game.field.data.forEach((cell : Cell, i : number) => {
                    svgListCopy.push(
                        <rect 
                            x={cell.coord.y * w + cell.size.y * w * 0.01}
                            y={cell.coord.x * h + cell.size.x * h * 0.01}
                            width={cell.size.y * w * 0.98}
                            height={cell.size.x * h * 0.98}
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
                    svgListCopy.push(
                        <rect 
                            x={cell.coord.x * w + cell.size.x * w * 0.01}
                            y={cell.coord.y * h + cell.size.y * h * 0.01}
                            width={cell.size.x * w * 0.98}
                            height={cell.size.y * h * 0.98}
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

            localStorage.removeItem('CUURENT_GAME_TILER_4_0')
        }

        setGameOver(game ? game.gameOver() : false)

        updateField()
    }, [size, moves, game])

    const redirect = () => {
        console.log('redirect')
        window.location.href = '/'
    }

    if(game) {
        return (
            <div className='game-page-main'>
                <Modal show={gameOver} onHide={redirect}>
                    <Modal.Header closeButton>
                        <Modal.Title>Игра окончена</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Игра окончена</p>
                        <p>вы проиграли</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Button>OK</Modal.Button>
                    </Modal.Footer>
                </Modal>
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
                <div className={game.move === 0 ? 'color-picker-main-0' : 'color-picker-main-1'}>
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

export default GamePage