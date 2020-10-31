import React, { useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import Field, { Cell, colors } from '../../Game/Field'
import './GamePage.css'

const GamePage = () => {
    let canvasRef = useRef<HTMLCanvasElement>(null)

    let [field, setField] = useState(new Field({
            fieldType:0, 
            fieldSize: 4, 
            countColors: 9, 
            startCellsType: 0
        })
    )

    //let field = new Field(0, 1, 9, 0)

    let hw = field.size.x / field.size.y

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')

        if(context) {
            let w = context.canvas.width
            let h = context.canvas.height 
            field?.data.forEach((cell : Cell, i : number) => {
                context.fillStyle = colors[cell.color]
                context.fillRect(
                    cell.coord.y * w + cell.size.y * w * 0.01, 
                    cell.coord.x * h + cell.size.x * h * 0.01, 
                    cell.size.y * w * 0.98, 
                    cell.size.x * h * 0.98
                )
            });
        }
    }, [])
    
    return (
        <div className='game-page-main'>
            <div className='game-header'>
                <div className='game-field-heder-color' style={{backgroundColor: 'red'}}/>
                <div className='game-field-heder-color' style={{backgroundColor: 'red'}}/>
            </div>
            <div className='game-field-main'>
                <div className='game-field'>
                    <TransformWrapper>
                        <TransformComponent>
                            <canvas ref={canvasRef} width={window.innerHeight * 5 } height={window.innerHeight * hw * 5}/>
                        </TransformComponent>
                    </TransformWrapper>
                </div>
            </div>
            <div className='game-footer'>

            </div>
        </div>
    )
}

export default GamePage