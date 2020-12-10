import React, { useEffect, useRef, useState } from 'react'
import './ToggleButton.css'


export interface ToggleButtonProps {
    isOn: boolean,
    width: string,
    onChange: (isOn: boolean) => void, 
}

const ToggleButton = (props : ToggleButtonProps) => {
    let ref = useRef<HTMLDivElement>(null)
    let [isOn, setIsOn] = useState(props.isOn)

    useEffect(() => {
        setIsOn(props.isOn)
    }, [props])

    return (
        <div style={{width: props.width}}>
            <div onClick={() =>  {props.onChange(!isOn); setIsOn(!isOn)}} ref={ref} className={isOn ? 'toggle-button-on' : 'toggle-button-off'}>
                <div className='circle' />
            </div>
        </div>
    )
}

export default ToggleButton