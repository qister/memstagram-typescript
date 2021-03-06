import { useState, FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Menu, Spin } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { User } from './User'
import { AppLayoutRoutes } from './AppLayoutRoutes'
import { MENU_SIDEBAR_ITEMS } from '../../constants/constants'
import './AppLayout.scss'
import { RootState } from 'redux/authToolkitRedux/StoreSlices'
import { Link, useLocation } from 'react-router-dom'
import { clearEntryLocation, fetchLogout, fetchUpdateTokens } from 'pages/Authorization/authSlice'
import { fetchUser } from 'components/Profile/userSlice'

const { Header, Sider, Content } = Layout

interface IProps {}

const tokenUpdatePeriod = 10 * 60 * 1000 // 10 минут

export const AppLayout: FC<IProps> = () => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const {
    authorization: { entryLocation, isTokenUpdated },
    user: {
      currentUser: { email },
    },
  } = useSelector((state: RootState) => state)

  useEffect(() => {
    if (!isTokenUpdated) {
      dispatch(fetchUpdateTokens())
    }

    if (isTokenUpdated) {
      dispatch(fetchUser())
    }

    if (entryLocation) {
      dispatch(clearEntryLocation())
    }

    const interval = setInterval(() => {
      dispatch(fetchUpdateTokens())
    }, tokenUpdatePeriod)

    return () => clearInterval(interval)
  }, [isTokenUpdated])

  const onHandleLogout = () => {
    dispatch(fetchLogout())
  }
  const location = useLocation()
  const activeItem = MENU_SIDEBAR_ITEMS.find((item) => location.pathname.includes(item.key))
  const activeItems = activeItem ? [activeItem.key] : undefined

  // Закомментил тк едет верстка в ленте и при переадресации после добавления мема
  // const layout_container_class = classNames('layout-container', {
  //   //  TODO theme пропсом передавать
  //   ['layout-container_theme-height']:
  //     !Array.isArray(defaultSelectedKey) && defaultSelectedKey !== ContentPath.Feed,
  // })

  const innerComponent = isTokenUpdated ? <AppLayoutRoutes /> : <Spin />

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
            <User user={{ name: email }} onLogout={onHandleLogout} />
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
          <div className="app">{innerComponent}</div>
        </Content>
      </Layout>
    </Layout>
  )
}
