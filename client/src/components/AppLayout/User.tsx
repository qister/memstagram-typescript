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
    <Menu
      items={[
        {
          key: '/settings',
          icon: <SettingOutlined />,
          label: <Link to="/settings">Настройки</Link>,
        },
        { key: '/logout', onClick: onLogout, icon: <ExportOutlined />, label: 'Выход' },
      ]}
    />
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
