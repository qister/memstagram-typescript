import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AppLayoutTemplate } from './AppLayoutTemplate'
import { ContentPath } from '../../constants/enums'
import { fetchLogout } from 'redux/authToolkitRedux/StoreSlices/authorization'

export interface MenuSideBarItem {
  key: string
  title: string
}

export const AppLayoutBehavior = (): JSX.Element => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const [defaultSelectedKey, setOnTapeDefault] = useState<ContentPath[]>([ContentPath.Feed])

  const history = useHistory()

  const onMenuItemClick = ({ key }: any) => {
    setOnTapeDefault(key)
    history.push(key)
  }

  const onHandleLogout = () => {
    dispatch(fetchLogout())
  }

  return React.createElement(AppLayoutTemplate, {
    collapsed,
    defaultSelectedKey,
    onMenuItemClick,
    setCollapsed,
    onHandleLogout,
  })
}
