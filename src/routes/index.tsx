/**
 * @file Route definitions for React router.
 */

import Home from '../containers/Home'
import NotFound from '../containers/NotFound'
import Privacy from '../containers/Privacy'

export default [{
  path: '/',
  exact: true,
  component: Home,
}, {
  path: '/privacy',
  exact: true,
  component: Privacy,
}, {
  path: '*',
  component: NotFound,
}]
