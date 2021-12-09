import { FC } from 'react'
import { HeartOutlined } from '@ant-design/icons'

import './MemesGallery.scss'

import { baseURL } from 'API/axios'
import { IMeme } from 'constants/interfaces'

const ROOT_CLASS = 'memes_gallery'

interface IProps {
  memes: IMeme[]
}

export const MemesGallery: FC<IProps> = ({ memes }) => (
  <div className={ROOT_CLASS}>
    {memes.map(({ imgUrl, likedBy }) => (
      <div
        className={`${ROOT_CLASS}__card`}
        key={imgUrl}
        style={{ backgroundImage: `url('${baseURL}/${imgUrl}')` }}
      >
        <div className={`${ROOT_CLASS}__card_description`}>
          <HeartOutlined /> <span>{likedBy.length}</span>
        </div>
      </div>
    ))}
  </div>
)
