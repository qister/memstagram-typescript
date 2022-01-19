import { Result, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { ContentPath } from 'constants/enums'
import { useNavigate } from 'react-router-dom'

export const UploadSuccessfull = () => {
  const navigate = useNavigate()

  const goToFeed = () => {
    navigate(ContentPath.Feed)
  }
  return (
    <Result
      icon={<SmileOutlined />}
      title="Спасибо, мем загружен!"
      extra={
        <Button type="primary" onClick={goToFeed}>
          В ленту
        </Button>
      }
    />
  )
}
