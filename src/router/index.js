import Discover from '@/pages/Discover'
import Friend from '@/pages/Friend'
import Mine from '@/pages/Mine'
import { Redirect } from 'react-router'

const routes = [
  {
    path: '/',
    exact: true,
    render() {
      return <Redirect to="/discover" />
    },
  },
  {
    path: '/discover ',
    component: Discover,
  },
  {
    path: '/friend',
    component: Friend,
  },
  {
    path: '/mine',
    component: Mine,
  },
]

export default routes
