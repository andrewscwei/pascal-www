import { align, animations, container, selectors } from 'promptu'
import React, { PropsWithChildren, ReactElement } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'
import Monogram from './Monogram'

interface StateProps {
  i18n: I18nState
}

interface Props extends StateProps, PropsWithChildren<{}> {
  onActivate: () => void;
}

function Header({ i18n, onActivate }: Props): ReactElement {
  const { ltxt, locale } = i18n

  return (
    <StyledRoot>
      <button onClick={() => onActivate() }>
        <StyledMonogram/>
        <h1>{ltxt('app-name')}</h1>
      </button>
    </StyledRoot>
  )
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
)(Header)

const StyledMonogram = styled(Monogram)`
  margin: 0 1.6rem 0 0;
`

const StyledRoot = styled.header`
  ${container.fhcs}
  ${align.ftl}
  ${animations.transition('opacity', 0.2)}
  height: 10rem;
  padding: 3rem 5%;
  width: 100%;
  z-index: 1000;

  > button {
    ${container.fhcl}
    color: ${props => props.theme.colors.white};
    height: 100%;
    position: relative;

    h1 {
      ${props => props.theme.fonts.t1}
    }

    ${selectors.hwot} {
      opacity: 0.8;
    }
  }
`
