import React, { FC, useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

import './Layout.scss'

const { Header, Sider, Content } = Layout

export const AppLayout: FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => setCollapsed(!collapsed)

  const ROOT_CLASS = 'layout-container'

  return (
    <Layout className={ROOT_CLASS}>
      <Sider
        className={`${ROOT_CLASS}__sidebar`}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className='logo' />
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
      <Layout className={`${ROOT_CLASS}__wrapper`}>
        <Header
          className={`${ROOT_CLASS}__header`}
          // className='site-layout-background'
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            },
          )}
        </Header>
        <Content
          // className='site-layout-background'
          className={`${ROOT_CLASS}__content`}
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
