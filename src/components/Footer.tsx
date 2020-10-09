import React, { PropsWithChildren, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { I18nState } from '../store/i18n';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {}

type OwnProps = PropsWithChildren<{

}>;

interface Props extends StateProps, DispatchProps, OwnProps {}

function Footer({ i18n }: Props): ReactElement {
  return (
    <StyledRoot>
      <span></span>
      <nav>
        <a href={`mailto:${__APP_CONFIG__.supportEmail}`}/>
      </nav>
    </StyledRoot>
  );
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
  (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({

  }, dispatch),
)(Footer);

const StyledRoot = styled.footer`
  > a {

  }
`;
