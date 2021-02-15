import React from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import './Icon.scss'

interface IProps {
    isLike: boolean
    onClickLike(): void
}

export const IconTemplate = ({ isLike, onClickLike }: IProps) => {
    return (
        <div className='icon-wrapper'>
            {isLike ? <HeartFilled onClick={onClickLike} className='heart-icon' /> : <HeartOutlined onClick={onClickLike} className='heart-icon' />}
        </div>
    )
}