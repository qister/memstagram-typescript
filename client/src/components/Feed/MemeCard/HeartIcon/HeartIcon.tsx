import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import './HeartIcon.scss'

interface IProps {
  liked: boolean
  onClick(): void
}

export const HeartIcon = ({ liked, onClick }: IProps) => {
  return (
    <div className="icon-wrapper">
      {liked ? (
        <HeartFilled onClick={onClick} className="heart-icon" />
      ) : (
        <HeartOutlined onClick={onClick} className="heart-icon" />
      )}
    </div>
  )
}
