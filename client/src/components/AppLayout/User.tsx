import { FC } from 'react'
import { Avatar, Dropdown, Menu } from 'antd'
import { SettingOutlined, ExportOutlined, UserOutlined } from '@ant-design/icons'

import './AppLayout.scss'
import { Link } from 'react-router-dom'

export const User: FC<any> = ({ user, onLogout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/settings">
          <SettingOutlined /> Настройки
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <a className="ant-dropdown-link" onClick={onLogout}>
          <ExportOutlined /> Выход
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <p className="username">{user.name}</p>
      <Dropdown overlay={menu} trigger={['click', 'hover']}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </>
  )
}
