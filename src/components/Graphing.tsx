import { align, animations, container, selectors } from 'promptu'
import React, { forwardRef, PureComponent, Ref } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import $$Background2 from '../assets/graphing-viewport.png'
import $$Background1 from '../assets/graphing-workspace.png'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'
import { layout } from '../styles/theme'

interface StateProps {
  i18n: I18nState
}

interface Props extends StateProps {
  forwardedRef?: Ref<HTMLDivElement>
  frame: number
}

class Graphing extends PureComponent<Props> {
  render() {
    const { i18n, frame, forwardedRef } = this.props
    const { ltxt, locale } = i18n

    return (
      <StyledRoot ref={forwardedRef}>
        <StyledBackground frame={frame}>
          <figure/>
          <figure/>
        </StyledBackground>
        <StyledContent frame={frame}>
          <span>
            <h2 dangerouslySetInnerHTML={{ __html: ltxt('graphing-title') }}/>
            <h4 dangerouslySetInnerHTML={{ __html: ltxt('graphing-subtitle') }}/>
          </span>
          {[...Array(2)].map((v, i) => (
            <article key={`copy-${i}`}>
              <h3 dangerouslySetInnerHTML={{ __html: ltxt(`graphing-feature-${i+1}-title`) }}/>
              <span dangerouslySetInnerHTML={{ __html: ltxt(`graphing-feature-${i+1}-description`) }}/>
            </article>
          ))}
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
)(forwardRef<HTMLDivElement, Props>((props, ref) => <Graphing {...props} forwardedRef={ref}/>))

const StyledContent = styled.div<{ frame: number }>`
  ${container.fvtl}
  ${selectors.eblc} { margin: 0 0 3rem 0; }
  padding: 3rem 5% 5rem;
  position: relative;
  width: 100%;

  > span, > article {
    ${container.fvtl}
    ${animations.transition(['opacity', 'transform'], 200)}
    color: ${props => props.theme.colors.white};
    opacity: ${props => props.frame > 0 ? 1 : 0};
    transform: ${props => `translate3d(0, ${props.frame > 0 ? 0 : 20}px, 0)`};
    max-width: 50rem;
    width: 90%;

    > span { opacity: .8; }
  }

  > span { margin: 0 0 5rem 0; }

  > * {
    &:nth-child(1) { transition-delay: ${props => props.frame > 0 ? `${50*0}ms` : '0ms'}; }
    &:nth-child(2) { transition-delay: ${props => props.frame > 0 ? `${50*1}ms` : '0ms'}; }
    &:nth-child(3) { transition-delay: ${props => props.frame > 0 ? `${50*2}ms` : '0ms'}; }
    &:nth-child(4) { transition-delay: ${props => props.frame > 0 ? `${50*3}ms` : '0ms'}; }
  }

  @media ${layout.wide} {
    ${container.fhtc}
    ${selectors.eblc} { margin: 0 7rem 0 0; }
    padding: 0 8%;

    > span {
      ${container.fvtr}
      width: auto;
    }

    > article {
      ${container.fvtl}
      width: 30%;
      max-width: 35rem;
    }
  }
`

const StyledBackground = styled.div<{ frame: number }>`
  ${animations.transition(['opacity', 'transform'], 600, 'ease-in-out')}
  height: 70vw;
  position: relative;
  width: 100%;
  opacity: ${props => props.frame > 0 ? 1 : 0};
  transform: ${props => `scale(${props.frame > 0 ? 1 : 0.9})`};

  > figure {
    ${align.cc}
    background-image: url(${$$Background1});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 100%;
    width: 100%;
  }

  > figure:nth-child(1) {
    background-image: url(${$$Background1});
    z-index: 0;
  }

  > figure:nth-child(2) {
    background-image: url(${$$Background2});
    z-index: 1;
    animation-name: ${props => props.frame > 0 ? 'fade-in' : 'fade-out'};
    animation-duration: ${props => props.frame > 0 ? '10s' : '400ms'};
    animation-iteration-count: ${props => props.frame > 0 ? 'infinite' : '1'};

    @keyframes fade-in {
      0% { opacity: 0; }
      40% { opacity: 0; }
      48% { opacity: 1; }
      88% { opacity: 1; }
      96% { opacity: 0; }
      100% { opacity: 0; }
    }

    @keyframes fade-out {
      to{ opacity: 0; }
    }
  }

  @media ${layout.wide} {
    height: 70vw;
    width: 80%;
  }
`;

const StyledRoot = styled.div`
  overflow-y: visible;
  position: relative;
  width: 100%;
  z-index: 1;

  > * { flex: 0 0 auto; }

  @media ${layout.wide} {
    ${container.fvbc}
    width: 100%;
    max-height: 100rem;
  }
`
