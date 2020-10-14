import { container } from 'promptu'
import React, { forwardRef, PureComponent, Ref } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'
import AppStoreButton from './AppStoreButton'

interface StateProps {
  i18n: I18nState
}

interface DispatchProps {}

interface OwnProps {
  frame: number
  forwardedRef?: Ref<HTMLDivElement>
}

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {}

class Hero extends PureComponent<Props, State> {
  render() {
    const { forwardedRef, i18n, frame } = this.props
    const { ltxt } = i18n

    return (
      <StyledRoot ref={forwardedRef}>
        <StyledContent>
          <StyledTitle dangerouslySetInnerHTML={{ __html: ltxt('app-description') }}/>
          <StyledAppStoreButton/>
        </StyledContent>
      </StyledRoot>
    )
  }
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
  undefined,
  undefined,
  { forwardRef: true },
)(forwardRef<HTMLDivElement, Props>((props, ref) => <Hero {...props} forwardedRef={ref}/>))

const StyledAppStoreButton = styled(AppStoreButton)`
  margin-top: 4rem;
  height: 6rem;
`

const StyledContent = styled.div`
  ${container.fvtl}
  max-width: 50rem;
`

const StyledTitle = styled.h1`
  ${props => props.theme.fonts.h1}
  color: ${props => props.theme.colors.white};
`

const StyledRoot = styled.div`
  ${container.fvcr}
  padding: 5% 5%;
  height: 100%;
  position: relative;
`
