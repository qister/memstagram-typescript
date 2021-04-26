import { Result, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { ContentPath } from 'constants/enums'

export const UploadSuccessfull = () => {
  const history = useHistory()

  const goToFeed = () => {
    history.push(ContentPath.Feed)
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
