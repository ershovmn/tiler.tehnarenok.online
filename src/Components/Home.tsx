import React, {useRef, useEffect, useState} from 'react'
import Field, { Cell, colors } from '../Game/Field'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

const Home = () => {
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

    console.log(field)

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

    return(
        <div style={{paddingLeft: '5vw', paddingRight: '5vw'}}>
            <TransformWrapper>
                <TransformComponent>
                    <canvas ref={canvasRef} style={{maxHeight: '90vh', maxWidth: '90vw'}} width={window.innerHeight * 5 } height={window.innerHeight * hw * 5}/>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

export default Home