import React, {ReactNode } from 'react'
import './Modal.css'

export interface ModalProps {
    show: boolean
    onHide: () => void,
    children?: React.ReactNode
}

export interface ModalHeaderProps {
    closeButton? : boolean
    children?: React.ReactNode
    onHide? : () => void
}

export interface ModalTitleProps {
    children?: React.ReactNode
}

export interface IModal {
    children: React.ReactNode | null
}

export interface ModalBodyProps {
    children? : React.ReactNode
}

export interface ModalFooterProps {
    children?: React.ReactNode
    onHide?: () => void
}

export interface ModalButtonProps {
    children?: React.ReactNode
    onClick?: () => void
    onHide?: () => void
}

class Modal extends React.Component<ModalProps, {show: boolean}> implements IModal {
    onHide = () => {}
    children : ReactNode | null = null
    static Header: Function
    static Title: Function
    static Body : Function
    static Footer : Function
    static Button : Function

    constructor(props : ModalProps) {
        super(props)
        this.state = {
            show: this.props.show,
        }
        this.children = this.props.children
    }

    render() {
        let children = React.Children.map(this.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {onHide: this.props.onHide})
            }
            return child
        })
        if(!this.props.show) {
            return null
        }
        return (
            <>
                <div className='modal-main' onClick={this.props.onHide}/>
                <div className='modal'>
                    <div className='modal-modal'>
                        {children}
                    </div>
                </div>
            </>
        )
    }
}

const Header = (props : ModalHeaderProps) => {
    console.log(props)
    return (
        <div className='modal-header'>
            {props.children}
            {props.closeButton ?
                <div onClick={props.onHide} className='close-button'>
                    <span>×</span>
                </div> : null 
            }
        </div>
    )
}

const Title = (props : ModalTitleProps) => {
    return (
        <div className='modal-title'>
            {props.children}
        </div>
    )
}

const Body = (props : ModalBodyProps) => {
    console.log(props)
    return (
        <div className='modal-body'>
            {props.children}
        </div>
    )
}

const Footer = (props : ModalFooterProps) => {
    let children = React.Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {onHide: props.onHide})
        }
        return child
    })
    return (
        <div className='modal-footer'>
            {children}
        </div>
    )
}

const Button = (props : ModalButtonProps) => {
    return (
        <div onClick={
            () => {
                if(props.onClick) props.onClick()
                if(props.onHide) props.onHide()
            }} 
            className='modal-button'
        >
            {props.children}
        </div>
    )
}



Modal.Header = Header
Modal.Title = Title
Modal.Body = Body
Modal.Footer = Footer
Modal.Button = Button

export default Modal
