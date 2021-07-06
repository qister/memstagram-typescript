import { Card, Avatar } from 'antd'
import { useDispatch } from 'react-redux'

import { HeartIcon } from './HeartIcon/HeartIcon'
import './MemeCard.scss'
import { IMeme } from 'constants/interfaces'
import { fetchLikeMeme } from 'components/Feed/feedSlice'

const { Meta } = Card

interface IProps {
  meme: IMeme
}

export const MemeCard = ({ meme: { _id, author, liked, imgUrl } }: IProps) => {
  const dispatch = useDispatch()
  const toggleLike = () => dispatch(fetchLikeMeme({ _id }))
  const imgLink = `${process.env.REACT_APP_SERVER_URL}/${imgUrl.replace('public/', '')}` // Удаляем 'public/' из url для корректной работы
  const ROOT_CLASS = 'meme-card'

  return (
    <Card className={ROOT_CLASS} cover={<img alt="example" src={imgLink} />}>
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={author}
      />
      <HeartIcon onClick={toggleLike} liked={liked} />
    </Card>
  )
}
