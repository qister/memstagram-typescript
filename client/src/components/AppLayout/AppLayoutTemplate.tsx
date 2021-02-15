import React from 'react'
import { Layout, Menu, Avatar } from 'antd'
import {
  UserOutlined,
} from '@ant-design/icons'

import { User } from '../User'
import { useRoutes } from './appRoutes'
import { MenuSideBarItem } from './AppLayoutBehavior'
import { MENU_SIDEBAR_ITEMS } from '../../constants/constants'
import './AppLayout.scss'

const { Header, Sider, Content } = Layout
const routes = useRoutes()

interface IProps {
  collapsed: boolean
  defaultSelectedKey: string[]
  onMenuItemClick: any
  setCollapsed: any
}

export const AppLayoutTemplate = ({
  collapsed,
  defaultSelectedKey,
  onMenuItemClick,
  setCollapsed,
}: IProps): JSX.Element => {
  const ROOT_CLASS = 'layout-container'
  return (
    <Layout className={ROOT_CLASS}>
      <Sider
        className={`${ROOT_CLASS}__sidebar`}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className={`${ROOT_CLASS}__logo`} />
        <Menu 
          theme='dark'
          mode='inline'
          selectedKeys={defaultSelectedKey}
          onClick={onMenuItemClick}
        >
          {MENU_SIDEBAR_ITEMS.map((item: MenuSideBarItem) => (
            <Menu.Item key={item.key} icon={<UserOutlined />}>{item.title}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className={`${ROOT_CLASS}-wrapper`}>
        <Header className={`${ROOT_CLASS}-wrapper__header`}>
          <div className={`${ROOT_CLASS}-wrapper__header-user`}>
            <User user={{ name: 'user' }} onLogout={() => {}} />
            <Avatar icon={<UserOutlined />} />
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
          <div className='app'>{routes}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
