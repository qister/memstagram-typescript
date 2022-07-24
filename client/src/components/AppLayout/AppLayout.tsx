import { useState, type ReactNode } from 'react'
import { Layout, Menu, Spin } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import { User } from './User'
import { MENU_SIDEBAR_ITEMS } from '../../constants/constants'
import { useUser } from 'API/userApi'
import { useAuthContext } from 'auth'

import './AppLayout.scss'

const { Header, Sider, Content } = Layout

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)

  const { logout, isTokenUpdating } = useAuthContext()

  const { data: userData = { data: { user: { email: '', nickname: '' } } } } = useUser()

  const {
    data: {
      user: { email, nickname },
    },
  } = userData

  const location = useLocation()
  const activeItem = MENU_SIDEBAR_ITEMS.find((item) => location.pathname.includes(item.key))
  const activeItems = activeItem ? [activeItem.key] : undefined

  const ROOT_CLASS = 'layout-container'

  if (isTokenUpdating)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Spin />
      </div>
    )

  return (
    <Layout>
      <Sider
        className={`${ROOT_CLASS}__sidebar`}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className={`${ROOT_CLASS}__logo`} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={activeItems}
          items={MENU_SIDEBAR_ITEMS.map(({ key, title, icon }) => ({
            icon,
            label: <Link to={key}>{title}</Link>,
            key,
          }))}
        />
      </Sider>
      <Layout className={`${ROOT_CLASS}-wrapper`}>
        <Header className={`${ROOT_CLASS}-wrapper__header`}>
          <div className={`${ROOT_CLASS}-wrapper__header-user`}>
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
          <div className="app">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
