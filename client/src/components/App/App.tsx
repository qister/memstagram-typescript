import { Spin } from 'antd'
import { Route, Routes, Navigate } from 'react-router-dom'

import { AppLayout } from 'components/AppLayout/AppLayout'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { useAuthContext } from 'auth'

import './App.scss'

export const App = () => {
  const { isTokenUpdating, isAuthenticated } = useAuthContext()

  return isAuthenticated ? (
    <Routes>
      <Route
        path="*"
        element={
          isTokenUpdating ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Spin />
            </div>
          ) : (
            <AppLayout />
          )
        }
      />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Registration />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
