import { FC } from 'react'
import { Card } from 'antd'

import './MemesGallery.scss'

import { baseURL } from 'API/axios'
import { IMeme } from 'constants/interfaces'

const ROOT_CLASS = 'memes_gallery'

interface IProps {
  memes: IMeme[]
}

export const MemesGallery: FC<IProps> = ({ memes }) => {
  return (
    <div className={ROOT_CLASS}>
      {memes.map(({ imgUrl, description, likedBy }) => {
        const imgLink = `${baseURL}/${imgUrl}`

        return (
          <Card
            className={`${ROOT_CLASS}__card`}
            key={imgLink}
            cover={<img className={`${ROOT_CLASS}__card_cover`} alt={description} src={imgLink} />}
            bordered={false}
            hoverable
          >
            <span>{likedBy.length} likes</span>
          </Card>
        )
      })}
    </div>
  )
}
