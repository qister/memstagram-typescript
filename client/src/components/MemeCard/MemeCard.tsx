import React from "react";
import { Card, Avatar } from 'antd';

import { Icon } from '../../UI/Icon'
import { IMG_LINK_PATH } from '../../constants/constants'
import { Meme } from '../../constants/types'
import './MemeCard.scss'

const { Meta } = Card;

interface IProps {
  meme: Meme
  toggleLike(): void
}

//TODO написать чтобы карточка просто принимала meme: IMeme и тогда убрать IProps
export const MemeCard = ({
  meme,
  toggleLike
}: IProps) => {
  const ROOT_CLASS = 'card-meme'
  const { author, liked,  imgUrl } = meme
  const imgLink = IMG_LINK_PATH + imgUrl.slice(7)

  return (
    <Card className={ROOT_CLASS} cover={ <img alt="example" src={imgLink}/> }>
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={author}
      />
      <Icon onClickLike={toggleLike} isLike={liked} />
    </Card>
  );
};
