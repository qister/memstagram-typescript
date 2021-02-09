import React from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import './Icon.scss'

interface IProps {
    isLike: boolean
    onClickLike(): void
}

export const IconTemplate = ({ isLike, onClickLike }: IProps) => {
    console.log('IconTemplate isLIke', isLike);
    
    return (
        <div onClick={onClickLike}>
            {isLike ? <HeartFilled className='heart-icon' /> : <HeartOutlined className='heart-icon' />}
        </div>
    )
}