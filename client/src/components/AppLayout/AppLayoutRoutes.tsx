import { Routes, Route, Navigate } from 'react-router-dom'

import { Profile } from 'pages/Profile/Profile'
import { Statistics } from 'pages/Statistics/Statistics'
import { ContentPath } from 'constants/enums'
import { AddMeme } from 'pages/AddMeme/AddMeme'
import { Feed } from 'pages/Feed/Feed'
import { VirtualFeed } from 'pages/Feed/VirtualFeed'

export const AppLayoutRoutes = () => (
  <Routes>
    <Route path={ContentPath.Feed} element={<VirtualFeed />} />
    <Route path={ContentPath.Profile} element={<Profile />} />
    <Route path={ContentPath.Statistics} element={<Statistics />} />
    <Route path={ContentPath.Add} element={<AddMeme />} />
    <Route path="*" element={<Navigate to={ContentPath.Feed} />} />
  </Routes>
)
