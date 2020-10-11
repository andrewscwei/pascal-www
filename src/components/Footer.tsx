import moment from 'moment';
import { animations, container, selectors } from 'promptu';
import React, { PropsWithChildren, ReactElement } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { I18nState } from '../store/i18n';
import { getLocalizedPath } from '../utils/i18n';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {}

type OwnProps = PropsWithChildren<{

}>;

interface Props extends StateProps, DispatchProps, OwnProps {}

function Footer({ i18n }: Props): ReactElement {
  const { ltxt, locale } = i18n;

  return (
    <StyledRoot>
      <span>{ltxt('copyright', { year: moment().year() })}</span>
      <StyledNavigation>
        <a href={`mailto:${__APP_CONFIG__.supportEmail}?subject=${__APP_CONFIG__.supportSubjectLine}`}>{ltxt('support')}</a>
        <NavLink to={getLocalizedPath('/privacy', locale)}>{ltxt('privacy')}</NavLink>
      </StyledNavigation>
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

const StyledNavigation = styled.nav`
  ${selectors.eblc} {
    margin-right: 1rem;
  }

  > a {
    ${props => props.theme.fonts.f1}
    ${animations.transition(['opacity', 'color'], 100)}
    color: ${props => props.theme.colors.white};

    ${selectors.hwot} {
      opacity: .8;
    }
  }
`;

const StyledRoot = styled.footer`
  ${container.fhcc}
  padding: 2rem 5%;
  width: 100%;

  ${selectors.eblc} {
    margin-right: 1rem;
  }

  > span {
    ${props => props.theme.fonts.f1}
    color: ${props => props.theme.colors.white};
  }
`;
