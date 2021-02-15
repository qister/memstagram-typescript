import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'

import { AppLayoutTemplate } from './AppLayoutTemplate'
import { ContentPath } from '../../constants/enums'

export interface MenuSideBarItem {
    key: string
    title: string
}

export const AppLayoutBehavior = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false)
  const [defaultSelectedKey, setOnTapeDefault] = useState<ContentPath[]>([ContentPath.Feed])

  const history = useHistory()

  const onMenuItemClick = ({ key }: any) => {
    setOnTapeDefault(key)
    history.push(key)
  }

  return React.createElement(AppLayoutTemplate, {
    collapsed,
    defaultSelectedKey,
    onMenuItemClick,
    setCollapsed,
  })
}
