import { FC } from 'react'
import { Avatar, Dropdown, Menu } from 'antd'
import { SettingOutlined, ExportOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import './AppLayout.scss'

interface IProps {
  username: string
  onLogout: () => void
}

export const User: FC<IProps> = ({ username, onLogout }) => {
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
      <p className="username">{username}</p>
      <Dropdown overlay={menu} trigger={['click', 'hover']}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </>
  )
}
