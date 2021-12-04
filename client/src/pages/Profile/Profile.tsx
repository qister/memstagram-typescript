import { useEffect } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import './Profile.scss'

import { fetchUserMemes } from './userSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import { MemesGallery } from './MemesGallery/MemesGallery'

const ROOT_CLASS = 'profile'

export const Profile = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserMemes())
  }, [])

  const {
    currentUser: { email },
    totalUserMemesCount,
    userMemes,
  } = useAppSelector((state) => state.user)

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
      <MemesGallery memes={userMemes} />
    </div>
  )
}
