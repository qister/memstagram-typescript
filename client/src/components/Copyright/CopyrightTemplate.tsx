import React from 'react'
import { Link, Typography } from '@material-ui/core'

export function CopyrightTemplate(): JSX.Element {
    return (
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='https://material-ui.com/'>
          Memstagram
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }