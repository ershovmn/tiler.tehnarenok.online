import React from 'react'
import './Loading.scss'

export interface LoadingProps {
    style: React.CSSProperties
}

const Loading = (props : LoadingProps) => {
    return (
        <div className='lodaing-main' style={props.style}>
            <svg width="350" height="350" viewBox={'0 0 240 240'} xmlns="http://www.w3.org/2000/svg">
        
                <g className="g-circles"  fill="none" stroke-width="5" stroke-dasharray="8% 45%">
                    <circle r="115" cx="120" cy="120" stroke="crimson"/>
                    <circle r="115" cx="120" cy="120" stroke="orangered" stroke-dashoffset="8%"/>
                    <circle r="115" cx="120" cy="120" stroke="orange" stroke-dashoffset="16%"/>
                    <circle r="115" cx="120" cy="120" stroke="gold" stroke-dashoffset="24%"/>
                    <circle r="115" cx="120" cy="120" stroke="yellowgreen" stroke-dashoffset="32%"/>
                    <circle r="115" cx="120" cy="120" stroke="steelblue" stroke-dashoffset="40%"/>
                    <circle r="115" cx="120" cy="120" stroke="blueviolet" stroke-dashoffset="48%"/>
                </g> 
                <g className="g-circles"  fill="none" stroke-width="120" stroke-dasharray="8% 45%" transform="translate(24 24) scale(.8)">
                    <circle r="60" cx="120" cy="120" stroke="crimson"/>
                    <circle r="60" cx="120" cy="120" stroke="orangered" stroke-dashoffset="8%"/>
                    <circle r="60" cx="120" cy="120" stroke="orange" stroke-dashoffset="16%"/>
                    <circle r="60" cx="120" cy="120" stroke="gold" stroke-dashoffset="24%"/>
                    <circle r="60" cx="120" cy="120" stroke="yellowgreen" stroke-dashoffset="32%"/>
                    <circle r="60" cx="120" cy="120" stroke="steelblue" stroke-dashoffset="40%"/>
                    <circle r="60" cx="120" cy="120" stroke="blueviolet" stroke-dashoffset="48%"/>
                </g> 
            </svg>
        </div>
    )
}

export default Loading