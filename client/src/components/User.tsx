import React, { FC } from 'react'
import { Dropdown, Menu } from 'antd'
import { SettingOutlined, ExportOutlined } from '@ant-design/icons'

import './AppLayout/AppLayout.scss'

export const User: FC<any> = ({ user, onLogout }) => {
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    onLogout()
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="">
          <SettingOutlined /> Настройки
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a className="ant-dropdown-link" onClick={handleLogout}>
          <ExportOutlined /> Выход
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <p className="username">{user.name}</p>
    </Dropdown>
  )
}
