import React, { FC, useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

import './Layout.scss'
import { User } from './User'

const { Header, Sider, Content } = Layout

export const ROOT_CLASS = 'layout-container'

export const AppLayout: FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className={ROOT_CLASS}>
      <Sider
        className={`${ROOT_CLASS}__sidebar`}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className={`${ROOT_CLASS}__logo`} />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item key='feed' icon={<UserOutlined />}>
            Лента
          </Menu.Item>
          <Menu.Item key='2' icon={<VideoCameraOutlined />}>
            Мэтчи
          </Menu.Item>
          <Menu.Item key='3' icon={<VideoCameraOutlined />}>
            Статистика
          </Menu.Item>
          <Menu.Item key='4' icon={<UploadOutlined />}>
            Профиль
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className={`${ROOT_CLASS}-wrapper`}>
        <Header className={`${ROOT_CLASS}-wrapper__header`}>
          <div className={`${ROOT_CLASS}-wrapper__header-user`}>
            <User user={{ name: 'user' }} onLogout={() => {}} />
          </div>
        </Header>
        <Content
          className={`${ROOT_CLASS}-wrapper__content`}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
