import React from 'react'

import { MenuBarTemplate } from './MenuBarTemplate'
import { useStyles } from '../../styles/menuBarStyle'

export function MenuBarBehavior() {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  return React.createElement(MenuBarTemplate, {
    anchorEl,
    open,
    classes,
    handleMenu,
    handleClose
  })
}
