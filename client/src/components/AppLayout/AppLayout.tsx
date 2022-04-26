import { useState, FC } from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

import { User } from './User'
import { AppLayoutRoutes } from './AppLayoutRoutes'
import { MENU_SIDEBAR_ITEMS } from '../../constants/constants'
import { useUser } from 'API/userApi'
import { useAuthContext } from 'auth'

import './AppLayout.scss'

const { Header, Sider, Content } = Layout

export const AppLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const { logout } = useAuthContext()

  const { data: userData } = useUser()

  const {
    data: {
      user: { email, nickname },
    },
  } = userData ?? { data: { user: { email: '' } } }

  const location = useLocation()
  const activeItem = MENU_SIDEBAR_ITEMS.find((item) => location.pathname.includes(item.key))
  const activeItems = activeItem ? [activeItem.key] : undefined

  const ROOT_CLASS = 'layout-container'
  return (
    <Layout>
      <Sider
        className={`${ROOT_CLASS}__sidebar`}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className={`${ROOT_CLASS}__logo`} />
        <Menu theme="dark" mode="inline" selectedKeys={activeItems}>
          {MENU_SIDEBAR_ITEMS.map((item) => (
            <Menu.Item key={item.key} icon={<UserOutlined />}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className={`${ROOT_CLASS}-wrapper`}>
        <Header className={`${ROOT_CLASS}-wrapper__header`}>
          <div className={`${ROOT_CLASS}-wrapper__header-user`}>
            {/* TODO поменять на ник */}
            <User username={nickname ?? email} onLogout={logout} />
          </div>
        </Header>
        <Content
          className={`${ROOT_CLASS}-wrapper__content`}
          style={{
            // Добавить в основной стиль
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            // Поправить высоту чтобы занимала весь экран
          }}
        >
          <div className="app">
            <AppLayoutRoutes />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
