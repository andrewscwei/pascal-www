import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
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

class Privacy extends PureComponent<Props, State> {

  componentDidMount() {
    document.title = this.props.i18n.ltxt('privacy-page-title');
  }

  render() {
    const { ltxt } = this.props.i18n;

    return (
      <StyledRoot>
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
)(Privacy);

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
`;
