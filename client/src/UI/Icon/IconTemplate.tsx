import React from 'react'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import './Icon.scss'

interface IProps {
  liked: boolean
  onClickLike(): void
}

export const IconTemplate = ({ liked, onClickLike }: IProps) => {
  return (
    <div className="icon-wrapper">
      {liked ? (
        <HeartFilled onClick={onClickLike} className="heart-icon" />
      ) : (
        <HeartOutlined onClick={onClickLike} className="heart-icon" />
      )}
    </div>
  )
}
