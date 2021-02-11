import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'

import { AppLayoutTemplate } from './AppLayoutTemplate'
import { MENU_SIDEBAR_ITEMS } from '../../constants/constants'

export interface MenuSideBarItem {
    key: string
    title: string
}

export const AppLayoutBehavior = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const [defaultSelectedKey, setOnTapeDefault] = useState<string[]>(['/feed'])

  const history = useHistory()

  const onMenuItemClick = ({ key }: any) => {
    setOnTapeDefault(key)
    history.push(key)
  }

  return React.createElement(AppLayoutTemplate, {
    collapsed,
    defaultSelectedKey,
    MENU_SIDEBAR_ITEMS,
    onMenuItemClick,
    setCollapsed,
  })
}
