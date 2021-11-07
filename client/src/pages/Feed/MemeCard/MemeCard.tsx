import { Card, Avatar } from 'antd'

import { HeartIcon } from './HeartIcon/HeartIcon'
import './MemeCard.scss'
import { IMeme } from 'constants/interfaces'
import { fetchLikeMeme } from 'pages/Feed/feedSlice'
import { baseURL } from 'API/axios'
import { useAppDispatch } from 'hooks'

const { Meta } = Card

interface IProps {
  meme: IMeme
}

export const MemeCard = ({ meme: { _id, author, liked, imgUrl } }: IProps) => {
  const dispatch = useAppDispatch()
  const toggleLike = () => dispatch(fetchLikeMeme({ _id }))
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
