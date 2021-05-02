import React from 'react'
import { Card, Avatar } from 'antd'
import { useDispatch } from 'react-redux'

import { Icon } from '../../UI/Icon'
import './MemeCard.scss'
import { IMeme } from 'constants/interfaces'
import { fetchLikeMeme } from 'components/Feed/feedSlice'

const { Meta } = Card

interface IProps {
  meme: IMeme
}

export const MemeCard = ({ meme: { _id, author, liked, imgUrl } }: IProps) => {
  const dispatch = useDispatch()

  const toggleLike = () => {
    dispatch(fetchLikeMeme({ _id }))
  }
  // TODO вынести порт или префикс целиком в конфиг
  // TODO убирать public не слайсом, а через find или регулярку
  const imgLink = 'http://localhost:4001/' + imgUrl.slice(7)

  const ROOT_CLASS = 'card-meme'
  return (
    <Card
      className={ROOT_CLASS}
      cover={
        <img alt="example" src={imgLink} style={{ maxHeight: `${window.innerHeight * 0.8}px` }} />
      }
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={author}
      />
      <Icon onClickLike={toggleLike} liked={liked} />
    </Card>
  )
}
