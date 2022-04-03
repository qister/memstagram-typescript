import { FC } from 'react'
import { Card, Avatar } from 'antd'

import { HeartIcon } from './HeartIcon/HeartIcon'
import { IMeme } from 'constants/interfaces'
import { baseURL } from 'API/axios'

import './MemeCard.scss'

const { Meta } = Card

interface IProps {
  meme: IMeme
  onLike: (_id: string) => void
}

export const MemeCard: FC<IProps> = ({ meme: { _id, author, liked, imgUrl }, onLike }) => {
  const toggleLike = () => onLike(_id)
  const imgLink = `${baseURL}/${imgUrl}`

  return (
    <Card cover={<img alt="example" src={imgLink} />}>
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={author}
      />
      <HeartIcon onClick={toggleLike} liked={liked} />
    </Card>
  )
}
