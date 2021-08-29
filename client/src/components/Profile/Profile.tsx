import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import './Profile.scss'
import { RootState } from 'redux/store'
import { fetchUserMemes } from './userSlice'

export const Profile = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserMemes())
  }, [])

  const {
    currentUser: { email },
    totalUserMemesCount,
    userMemes,
  } = useSelector((state: RootState) => state.user)

  const getMemeUrl = (url: string) => {
    return 'http://localhost:4000/' + url.slice(7)
  }

  const ROOT_CLASS = 'profile'

  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__header`}>
        <div className={`${ROOT_CLASS}__avatar`}>
          <Avatar size={100} icon={<UserOutlined />} />
        </div>
        <div className={`${ROOT_CLASS}__info`}>
          <div>{email}</div>
          <div>{totalUserMemesCount} Публикаций</div>
        </div>
      </div>
      {/* TODO: сделать динамическое изменение размера картинок в гриде в зависимости от количества, можно воспользоваться антовскими гридами */}
      <div className={`${ROOT_CLASS}__memes-grid`}>
        {userMemes.map((userMeme: any) => (
          <div className={`${ROOT_CLASS}__meme-img`}>
            <img src={getMemeUrl(userMeme.imgUrl)} alt={userMeme.description} />
          </div>
        ))}
      </div>
    </div>
  )
}
