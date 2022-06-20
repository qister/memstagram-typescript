import { Row, Col, Statistic } from 'antd'

import { useUserStatistics } from 'API/userApi'

export const Statistics = () => {
  const { data, isLoading } = useUserStatistics()

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic
          title="Поставлено лайков"
          value={data?.data.likedMemesCount}
          loading={isLoading}
        />
      </Col>
      <Col span={12}>
        <Statistic
          title="Загружено мемов"
          value={data?.data.uploadedMemesCount}
          loading={isLoading}
        />
      </Col>
    </Row>
  )
}
