import React from "react";
import { Card } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

import { Icon } from '../../UI/Icon'
import './MemeCard.scss'

export const MemeCardTemplate = () => {

  const onLike = (value: any) => {
    console.log('onLike value', value);
  }

  const ROOT_CLASS = 'card-meme'

  return (
    <Card
      className={ROOT_CLASS}
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Icon value='dislike' onClick={onLike}>
          <DislikeOutlined />
        </Icon>,
        <Icon value='like' onClick={onLike}>
          <LikeOutlined />
        </Icon>
      ]}
    >
    </Card>
  );
};
