import { align, animations, container, media } from 'promptu'
import React, { forwardRef, PureComponent, Ref } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import $$Background2 from '../assets/hero-graphing.png'
import $$Background3 from '../assets/hero-programmer.png'
import $$Background1 from '../assets/hero-scientific.png'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'
import { layout } from '../styles/theme'
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
        <StyledBackground frame={frame}>
          <div>
            <figure/>
            <figure/>
            <figure/>
          </div>
        </StyledBackground>
        <StyledContent frame={frame}>
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

const StyledBackground = styled.div<{ frame: number }>`
  ${align.cl}
  height: 100%;
  width: 100%;
  opacity: .6;

  > div {
    ${align.tl}
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  figure {
    ${align.tl}
    ${animations.transition(['opacity', 'transform'], 500, 'ease-out')}
    height: 100%;
    width: 200%;
    left: -50%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }

  figure:nth-child(1) {
    opacity: ${props => props.frame > 0 ? 1 : 0};
    transition-delay: ${props => props.frame > 0 ? '500ms' : '0ms'};
    transform: ${props => `translate3d(${props.frame > 0 ? 0 : 140}px, ${props.frame > 0 ? 0 : 120}px, 0)`};
    background-image: url(${$$Background1});
    z-index: 1;
  }

  figure:nth-child(2) {
    transition-delay: ${props => props.frame > 0 ? '400ms' : '0ms'};
    transform: ${props => `translate3d(${props.frame > 0 ? 0 : 100}px, ${props.frame > 0 ? 0 : 80}px, 0)`};
    opacity: ${props => props.frame > 0 ? 1 : 0};
    background-image: url(${$$Background2});
    z-index: 0;
  }

  figure:nth-child(3) {
    transition-delay: ${props => props.frame > 0 ? '300ms' : '0ms'};
    transform: ${props => `translate3d(${props.frame > 0 ? 0 : 40}px, ${props.frame > 0 ? 0 : 40}px, 0)`};
    opacity: ${props => props.frame > 0 ? 1 : 0};
    background-image: url(${$$Background3});
    z-index: 0;
  }

  @media ${layout.wide} {
    height: 120%;

    figure {
      left: 10%;
      width: 100%;
      background-size: contain;
      background-position: center left;
    }
  }
`;

const StyledAppStoreButton = styled(AppStoreButton)`
  margin-top: 2rem;
  height: 4rem;

  @media ${media.gttablet} {
    margin-top: 4rem;
    height: 6rem;
  }
`

const StyledContent = styled.div<{ frame: number }>`
  ${container.fvtc}
  position: relative;
  text-align: center;

  > * {
    ${animations.transition(['opacity', 'transform'], 400, 'ease-out')}

    &:nth-child(1) {
      opacity: ${props => props.frame > 0 ? 1 : 0};
      transition-delay: ${props => props.frame > 0 ? '500ms' : '0ms'};
      transform: ${props => `translate3d(0, ${props.frame > 0 ? 0 : 40}px, 0)`};
    }

    &:nth-child(2) {
      transition-delay: ${props => props.frame > 0 ? '400ms' : '0ms'};
      transform: ${props => `translate3d(0, ${props.frame > 0 ? 0 : 40}px, 0)`};
      opacity: ${props => props.frame > 0 ? 1 : 0};
    }
  }

  @media ${layout.wide} {
    ${container.fvtl}
    text-align: left;
    width: 45%;
    max-width: 50rem;
  }
`

const StyledTitle = styled.h1`
  color: ${props => props.theme.colors.white};
`

const StyledRoot = styled.div`
  ${container.fvbc}
  height: 100%;
  overflow-y: visible;
  padding: 10% 10%;
  position: relative;
  width: 100%;
  max-height: 170vw;

  @media ${layout.wide} {
    ${container.fvcr}
    padding: 5% 5%;
    max-height: 100%;
  }
`
