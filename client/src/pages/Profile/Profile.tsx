import { useEffect } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { pluralize } from 'numeralize-ru'

import './Profile.scss'

import { MemesGallery } from './MemesGallery/MemesGallery'
import { useUser } from 'API/userApi'
import { useUserMemes } from 'API/memesAPI'

const ROOT_CLASS = 'profile'

export const Profile = () => {
  const { data: userData } = useUser()
  const { data: userMemesData } = useUserMemes()

  const {
    data: { memes, total },
    // TODO посмотреть лучшие практики как указывать значение по умолчанию в реакт квери
  } = userMemesData ?? { data: { memes: [], total: 0 } }

  const {
    data: {
      user: { email },
    },
  } = userData ?? { data: { user: { email: '' } } }

  return (
    <div className={ROOT_CLASS}>
      <div className={`${ROOT_CLASS}__header`}>
        <div className={`${ROOT_CLASS}__avatar`}>
          <Avatar size={100} icon={<UserOutlined />} />
        </div>
        <div className={`${ROOT_CLASS}__info`}>
          <div>{email}</div>
          <div>
            {total} {pluralize(total, 'публикация', 'публикации', 'публикаций')}
          </div>
        </div>
      </div>
      <MemesGallery memes={memes} />
    </div>
  )
}
