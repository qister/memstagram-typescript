import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppLayoutTemplate } from './AppLayoutTemplate'
import { fetchLogout } from 'pages/Authorization/authSlice'

// TODO убрать и поправить тип
export interface MenuSideBarItem {
  key: string
  title: string
}

export const AppLayoutBehavior = (): JSX.Element => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)

  const onHandleLogout = () => {
    dispatch(fetchLogout())
  }

  return React.createElement(AppLayoutTemplate, {
    collapsed,
    setCollapsed,
    onHandleLogout,
  })
}
