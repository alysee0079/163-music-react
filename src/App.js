import React, { memo, Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'

import routes from '@/router'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PlayerBar from './pages/Player/PlayerBar'

export default memo(function App() {
  return (
    <HashRouter>
      <Header />
      <Suspense fallback={''}>{renderRoutes(routes)}</Suspense>
      <Footer />
      <PlayerBar />
    </HashRouter>
  )
})
