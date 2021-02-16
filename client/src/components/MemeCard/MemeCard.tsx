import React from "react";
import { Card, Avatar } from 'antd';

import { Icon } from '../../UI/Icon'
import './MemeCard.scss'

const { Meta } = Card;

interface IProps {
  liked: boolean
  likesNumber?: any
  author?: string
  imgUrl: string
  toggleLike(): void
}

//TODO написать чтобы карточка просто принимала meme: IMeme и тогда убрать IProps
export const MemeCard = ({
  liked,
  author,
  imgUrl,
  toggleLike
}: IProps) => {
  const ROOT_CLASS = 'card-meme'
  
  return (
    <Card className={ROOT_CLASS} cover={ <img alt="example" src={imgUrl}/> }>
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={author}
      />
      <Icon onClickLike={toggleLike} isLike={liked} />
    </Card>
  );
};
