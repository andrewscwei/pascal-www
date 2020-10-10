import { container } from 'promptu';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { I18nState } from '../store/i18n';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {}

interface OwnProps {
  isActive: boolean;
}

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {}

class Scientific extends PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    isActive: false,
  };

  render() {
    const { ltxt } = this.props.i18n;

    return (
      <StyledRoot>
        <StyledContent>
        </StyledContent>
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
)(Scientific);

const StyledContent = styled.div`
  ${container.fvtl}
  max-width: 50rem;
`;

const StyledRoot = styled.div`
  ${container.fvcr}
  background: ${props => props.theme.colors.black};
  height: 100%;
  padding: 5% 5%;
`;
