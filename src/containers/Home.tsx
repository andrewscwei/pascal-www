import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import Hero from '../components/Hero';
import { AppState } from '../store';
import { I18nState } from '../store/i18n';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {

}

type OwnProps = RouteComponentProps<{

}>;

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {

}

class Home extends PureComponent<Props, State> {
  componentDidMount() {
    document.title = this.props.i18n.ltxt('home');
  }

  render() {
    const { t } = this.props.i18n;

    return (
      <StyledRoot>
        <Hero/>
      </StyledRoot>
    );
  }
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
  (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({

  }, dispatch),
)(Home);

const StyledRoot = styled.div`
`;
