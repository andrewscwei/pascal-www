import { align, animations, container, selectors } from 'promptu'
import React, { forwardRef, PureComponent, Ref } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import $$Background1 from '../assets/extensions-phone.png'
import $$Background2 from '../assets/extensions-watch.png'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'
import { media } from '../styles/theme'

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

class Extensions extends PureComponent<Props, State> {
  render() {
    const { i18n, forwardedRef, frame } = this.props
    const { ltxt, locale } = i18n

    return (
      <StyledRoot ref={forwardedRef} frame={frame}>
        <StyledBackground frame={frame}>
          <figure/>
          <figure/>
          <span>
            <h2 dangerouslySetInnerHTML={{ __html: ltxt('extensions-title') }}/>
            <h4 dangerouslySetInnerHTML={{ __html: ltxt('extensions-subtitle') }}/>
          </span>
        </StyledBackground>
        <StyledContent frame={frame}>
          {[...Array(2)].map((v, i) => (
            <article key={`copy-${i}`}>
              <h3 dangerouslySetInnerHTML={{ __html: ltxt(`extensions-feature-${i+1}-title`) }}/>
              <span dangerouslySetInnerHTML={{ __html: ltxt(`extensions-feature-${i+1}-description`) }}/>
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
)(forwardRef<HTMLDivElement, Props>((props, ref) => <Extensions {...props} forwardedRef={ref}/>))

const StyledContent = styled.div<{ frame: number }>`
  ${container.fvtl}
  ${selectors.eblc} { margin: 0 0 3rem 0; }
  background: ${props => props.theme.colors.black};
  padding: 3rem 2rem;
  position: relative;
  width: 100%;

  > article {
    ${container.fvtl}
    ${animations.transition(['opacity', 'transform'], 200)}
    opacity: ${props => props.frame > 0 ? 1 : 0};
    transform: ${props => `translate3d(0, ${props.frame > 0 ? 0 : 20}px, 0)`};
    color: ${props => props.theme.colors.white};
    max-width: 26rem;
    width: 100%;

    > span { opacity: .8; }
  }

  > * {
    &:nth-child(1) { transition-delay: ${props => props.frame > 0 ? `${50*0}ms` : '0ms'}; }
    &:nth-child(2) { transition-delay: ${props => props.frame > 0 ? `${50*1}ms` : '0ms'}; }
    &:nth-child(3) { transition-delay: ${props => props.frame > 0 ? `${50*2}ms` : '0ms'}; }
    &:nth-child(4) { transition-delay: ${props => props.frame > 0 ? `${50*3}ms` : '0ms'}; }
  }

  @media ${media.wide} {
    ${container.fhtc}
    ${selectors.eblc} { margin: 0 12% 0 0; }
    padding: 5rem 8%;

    > article {
      ${container.fvtc}
      width: 30%;
      max-width: 30rem;
      text-align: center;
    }
  }
`

const StyledBackground = styled.div<{ frame: number }>`
  ${container.fvcc}
  height: 60vw;
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.colors.red};

  > figure {
    ${align.tl}
    ${animations.transition(['opacity', 'transform'], 600, 'ease-in-out')}
    width: 100%;
    height: 100%;
    background-position: bottom center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  > figure:nth-child(1) {
    opacity: ${props => props.frame > 0 ? 1 : 0};
    transition-delay: ${props => props.frame > 0 ? '200ms' : '0ms'};
    transform: ${props => `translate3d(0, ${props.frame > 0 ? 0 : -60}px, 0)`};
    background-image: url(${$$Background1});
    z-index: 1;
  }

  > figure:nth-child(2) {
    transition-delay: ${props => props.frame > 0 ? '300ms' : '0ms'};
    transform: ${props => `translate3d(0, ${props.frame > 0 ? 0 : 60}px, 0)`};
    opacity: ${props => props.frame > 0 ? 1 : 0};
    background-image: url(${$$Background2});
    z-index: 0;
  }

  > span {
    ${container.fvtc}
    ${animations.transition(['opacity', 'transform'], 200)}
    transition-delay: ${props => props.frame > 0 ? '200ms' : '0ms'};
    opacity: ${props => props.frame > 0 ? 1 : 0};
    transform: ${props => `translate3d(0, ${props.frame > 0 ? 0 : 40}px, 0)`};
    color: ${props => props.theme.colors.white};
    z-index: 2;
  }
`;

const StyledRoot = styled.div<{ frame: number }>`
  ${container.fvtc}
  ${animations.transition(['opacity', 'transform'], 400, 'ease-in-out')}
  opacity: ${props => props.frame > 0 ? 1 : 0};
  transform: ${props => `scale(${props.frame > 0 ? 1 : 1.04})`};
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  width: 94%;

  > * { flex: 0 0 auto; }

  @media ${media.wide} {
    ${container.fvbc}
    width: 94%;
  }
`
