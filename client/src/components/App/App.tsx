import { useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'

import { AppLayout } from 'components/AppLayout/AppLayout'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { setEntryLocation } from 'pages/Authorization/authSlice'
import { useAppDispatch, useAppSelector } from 'hooks'

import './App.scss'

export const App = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authorization)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(setEntryLocation(location.pathname))
  }, [])

  return isAuthenticated ? (
    <Routes>
      <Route path="*" element={<AppLayout />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Registration />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
