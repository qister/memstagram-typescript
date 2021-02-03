import React from 'react'

interface IProps {
    value: string
    onClick(value: string): void
    children: React.ReactNode
}

export const IconTemplate = ({ children, value, onClick }: IProps) => {

    const onClickIcon = () => {
        onClick(value)
    }

    return (
        <div onClick={onClickIcon}>{children}</div>
    )
}