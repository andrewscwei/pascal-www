/**
 * @file Route definitions for React router.
 */

import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

export default [{
  path: '/',
  exact: true,
  component: Home,
}, {
  path: '*',
  component: NotFound,
}];
