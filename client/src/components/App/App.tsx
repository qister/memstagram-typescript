import { Route, Routes, Navigate } from 'react-router-dom'

import { Profile } from 'pages/Profile/Profile'
import { Statistics } from 'pages/Statistics/Statistics'
import { ContentPath } from 'constants/enums'
import { AddMeme } from 'pages/AddMeme/AddMeme'
import { Feed } from 'pages/Feed/Feed'
import { VirtualFeed } from 'pages/Feed/VirtualFeed'

import { AppLayout } from 'components/AppLayout/AppLayout'
import { Registration } from 'pages/Registration/Registration'
import { LoginForm } from 'pages/Authorization/Login'
import { useAuthContext } from 'auth'

import './App.scss'

export const App = () => {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? (
    <AppLayout>
      <Routes>
        <Route path={ContentPath.Feed} element={<VirtualFeed />} />
        <Route path={ContentPath.Profile} element={<Profile />} />
        <Route path={ContentPath.Statistics} element={<Statistics />} />
        <Route path={ContentPath.Add} element={<AddMeme />} />
        <Route path="*" element={<Navigate to={ContentPath.Feed} />} />
      </Routes>
    </AppLayout>
  ) : (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Registration />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
