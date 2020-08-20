import React from 'react'
import { connect } from 'react-redux'
import { AddPage_ } from '../pages/AddPage'

const AddPage = connect(null, null)(AddPage_)

export const AddPageContainer = () => {
  return < AddPage />
}
