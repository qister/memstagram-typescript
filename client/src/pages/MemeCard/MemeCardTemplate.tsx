import React from "react";
import { Card, Avatar } from 'antd';

import { Icon } from '../../UI/Icon'
import './MemeCard.scss'

const { Meta } = Card;

interface IProps {
  liked: boolean
  likesNumber: any
  author: string
  imgUrl: string
  fetchingStatus: string
  decrementIndex(): void
  incrementIndex(): void
  toggleLike(): void
}

export const MemeCardTemplate = ({
  liked,
  likesNumber,
  author,
  imgUrl,
  fetchingStatus,
  decrementIndex,
  incrementIndex,
  toggleLike
}: IProps) => {
  const ROOT_CLASS = 'card-meme'
  
  return (
    <Card
      className={ROOT_CLASS}
      cover={
        <img
          alt="example"
          src={imgUrl}
        />
      }
      actions={[ <Icon onClickLike={toggleLike} isLike={liked} /> ]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={author}
      />
    </Card>
  );
};
