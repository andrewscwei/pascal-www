 /**
 * @file Client app root.
 */

import React, { Fragment, PureComponent } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Action, bindActionCreators, Dispatch } from 'redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import routes from '../routes';
import { AppState } from '../store';
import { changeLocale, I18nState } from '../store/i18n';
import globalStyles from '../styles/global';
import * as theme from '../styles/theme';
import debug from '../utils/debug';
import { getLocaleFromPath } from '../utils/i18n';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {
  changeLocale: typeof changeLocale;
}

interface OwnProps {
  route: RouteComponentProps;
}

interface Props extends StateProps, DispatchProps, OwnProps {}

interface State {

}

class App extends PureComponent<Props, State> {
  unlistenHistory?: () => any = undefined;

  constructor(props: Props) {
    super(props);

    this.syncLocaleWithUrl(this.props.route.location.pathname);

    debug('Initializing...', 'OK');
  }

  componentDidMount() {
    this.unlistenHistory = this.props.route.history.listen((location) => this.syncLocaleWithUrl(location.pathname));
  }

  componentWillUnmount() {
    this.unlistenHistory?.();
  }

  render() {
    const { route } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyles/>
          <Header isCollapsed={false}/>
          <Switch location={route.location}>{this.generateRoutes()}</Switch>
        </Fragment>
      </ThemeProvider>
    );
  }

  private syncLocaleWithUrl(url: string) {
    const { route, changeLocale, i18n } = this.props;
    const newLocale = getLocaleFromPath(url);

    if (newLocale === i18n.locale) {
      debug(`Syncing locale with URL path "${route.location.pathname}"...`, 'SKIPPED');
      return;
    }

    debug(`Syncing locale with URL path "${route.location.pathname}"...`, 'OK');

    changeLocale(newLocale);
  }

  private generateRoutes() {
    return routes.map((route, index) => (
      <Route exact={route.exact} path={route.path} key={`route-${index}`} component={route.component}/>
    ));
  }
}

export default hot(connect((state: AppState): StateProps => ({
  i18n: state.i18n,
}), (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({
  changeLocale,
}, dispatch))(App));

const GlobalStyles = createGlobalStyle<any>`
  ${globalStyles}
`;
