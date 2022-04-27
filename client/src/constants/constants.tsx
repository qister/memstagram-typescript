import { BorderOutlined, FileAddOutlined, StockOutlined, UserOutlined } from '@ant-design/icons'

import { ContentPath } from './enums'

const { Feed, Statistics, Profile, Add } = ContentPath

export const MENU_SIDEBAR_ITEMS = [
  {
    key: Feed,
    title: 'Лента',
    icon: <BorderOutlined />,
  },
  {
    key: Statistics,
    title: 'Статистика',
    icon: <StockOutlined />,
  },
  {
    key: Profile,
    title: 'Профиль',
    icon: <UserOutlined />,
  },
  {
    key: Add,
    title: 'Добавить',
    icon: <FileAddOutlined />,
  },
]
