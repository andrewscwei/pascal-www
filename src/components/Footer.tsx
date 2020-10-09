import moment from 'moment';
import { container } from 'promptu';
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
  const { ltxt } = i18n;

  return (
    <StyledRoot>
      <span>{ltxt('copyright', { year: moment().year() })}</span>
      <nav>
        <a href={`mailto:${__APP_CONFIG__.supportEmail}`}>{ltxt('support')}</a>
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
  ${container.fhcc}
  padding: 2rem 5%;
  width: 100%;

  > span {
    ${props => props.theme.fonts.f1}
    color: ${props => props.theme.colors.white};
  }

  > nav {
    margin-left: 1rem;

    > a {
      ${props => props.theme.fonts.f1}
      color: ${props => props.theme.colors.white};
    }
  }

`;
