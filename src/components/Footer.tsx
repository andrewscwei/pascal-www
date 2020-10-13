import moment from 'moment'
import { animations, container, media, selectors } from 'promptu'
import React, { PropsWithChildren, ReactElement } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'
import { getLocalizedPath } from '../utils/i18n'
import AppStoreButton from './AppStoreButton'
import Monogram from './Monogram'

interface StateProps {
  i18n: I18nState
}

interface Props extends StateProps, PropsWithChildren<{}> {}

function Footer({ i18n }: Props): ReactElement {
  const { ltxt, locale } = i18n

  return (
    <StyledRoot>
      <StyledContent>
        <StyledLogo>
          <span>
            <Monogram/>
            <h2>{ltxt('app-name')}</h2>
          </span>
          <h3>{ltxt('app-tagline')}</h3>
        </StyledLogo>
        <StyledAppStoreButton/>
      </StyledContent>
      <StyledNavigation>
        <span>{ltxt('copyright', { year: moment().year() })}</span>
        <nav>
          <a href={`mailto:${__APP_CONFIG__.supportEmail}?subject=${__APP_CONFIG__.supportSubjectLine}`}>{ltxt('support')}</a>
          <NavLink to={getLocalizedPath('/privacy', locale)}>{ltxt('privacy')}</NavLink>
        </nav>
      </StyledNavigation>
    </StyledRoot>
  )
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
)(Footer)

const StyledNavigation = styled.div`
  ${container.fhcs}
  ${selectors.eblc} { margin-right: 1rem; }
  width: 100%;
  margin: 4rem 0 0;

  > span, a {
    ${animations.transition(['opacity', 'color'], 100)}
    ${props => props.theme.fonts.f1}
    color: ${props => props.theme.colors.darkGrey};
  }

  > nav {
    ${selectors.eblc} { margin-right: 1rem; }

    > a {
      ${selectors.hwot} {
        color: ${props => props.theme.colors.white};
      }
    }
  }
`

const StyledContent = styled.div`
  ${container.fhcs}
  width: 100%;
`

const StyledAppStoreButton = styled(AppStoreButton)`
  height: 4rem;
`

const StyledLogo = styled.div`
  ${container.fvtl}

  span {
    ${container.fhcl}
    ${selectors.eblc} { margin-right: .8rem; }
    height: 3rem;
  }

  h2 {
    ${props => props.theme.fonts.t2}
    color: ${props => props.theme.colors.white};
  }

  h3 {
    ${props => props.theme.fonts.t3}
    margin-left: 3.8rem;
    color: ${props => props.theme.colors.white};
    @media ${media.lttablet} { display: none; }
  }
`

const StyledRoot = styled.footer`
  ${container.fvtl}
  margin: 5rem 0 0;
  padding: 4rem 5%;
  width: 100%;
`
