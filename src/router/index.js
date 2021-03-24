import React from 'react'
import { Redirect } from 'react-router'

const Discover = React.lazy(_ => import('../pages/Discover'))
const Recommend = React.lazy(_ => import('../pages/Discover/subpages/Recommend'))
const Ranking = React.lazy(_ => import('../pages/Discover/subpages/Ranking'))
const Songs = React.lazy(_ => import('../pages/Discover/subpages/Songs'))
const Djradio = React.lazy(_ => import('../pages/Discover/subpages/Djradio'))
const Artist = React.lazy(_ => import('../pages/Discover/subpages/Artist'))
const Album = React.lazy(_ => import('../pages/Discover/subpages/Album'))
const Player = React.lazy(_ => import('../pages/Player'))

const Friend = React.lazy(_ => import('../pages/Friend'))
const Mine = React.lazy(_ => import('../pages/Mine'))
const NotFound = React.lazy(_ => import('../pages/NotFound'))

const routes = [
  {
    path: '/',
    exact: true,
    render() {
      return <Redirect to="/discover" />
    },
  },
  {
    path: '/discover',
    component: Discover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to={'/discover/recommend'} />,
      },
      {
        path: '/discover/recommend',
        component: Recommend,
      },
      {
        path: '/discover/ranking',
        component: Ranking,
      },
      {
        path: '/discover/songs',
        component: Songs,
      },
      {
        path: '/discover/djradio',
        exact: true,
        component: Djradio,
      },
      {
        path: '/discover/artist',
        component: Artist,
      },
      {
        path: '/discover/album',
        component: Album,
      },
      {
        path: '/discover/player',
        component: Player,
      },
    ],
  },
  {
    path: '/friend',
    component: Friend,
  },
  {
    path: '/mine',
    component: Mine,
  },
  {
    path: '*',
    component: NotFound,
  },
]

export default routes
