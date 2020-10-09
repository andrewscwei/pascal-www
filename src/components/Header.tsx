import { align, animations, container, selectors } from 'promptu';
import React, { PropsWithChildren, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { I18nState } from '../store/i18n';
import { getLocalizedPath } from '../utils/i18n';
import Monogram from './Monogram';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {}

type OwnProps = PropsWithChildren<{
  isCollapsed: boolean;
}>;

interface Props extends StateProps, DispatchProps, OwnProps {}

function Header({ i18n, isCollapsed }: Props): ReactElement {
  const { ltxt, locale } = i18n;

  return (
    <StyledRoot isCollapsed={isCollapsed}>
      <Link to={getLocalizedPath('/', locale)}>
        <StyledMonogram/>
        <h1>{ltxt('app-name')}</h1>
      </Link>
      <nav>
        <NavLink to='/#scientific'>{ltxt('scientific-title')}</NavLink>
        <NavLink to='/#graphing'>{ltxt('graphing-title')}</NavLink>
        <NavLink to='/#programmer'>{ltxt('programmer-title')}</NavLink>
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
)(Header);

const StyledMonogram = styled(Monogram)`
  margin-right: 1rem;
`;

const StyledRoot = styled.header<{ isCollapsed: boolean }>`
  ${container.fhcs}
  ${align.ftl}
  ${animations.transition('opacity', 0.2)}
  height: ${props => props.isCollapsed ? '7rem' : '10rem'};
  width: 100%;
  padding: 2rem 5%;
  z-index: 1000;
  color: ${props => props.theme.colors.white};

  > a {
    ${container.fhcl}
    height: 100%;
    color: ${props => props.theme.colors.white};

    h1 {
      ${props => props.theme.fonts.t1}
    }

    ${selectors.hwot} {
      opacity: 0.8;
    }
  }

  > nav {
    ${container.fhcr}

    ${selectors.eblc} {
      margin-right: 1rem;
    }

    a {
      ${props => props.theme.fonts.n1}
      color: ${props => props.theme.colors.white};
    }
  }
`;
