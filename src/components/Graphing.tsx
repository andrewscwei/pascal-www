import { align, container, selectors } from 'promptu'
import React, { forwardRef, PureComponent, Ref } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import $$Background from '../assets/graphing@3x.png'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'
import { media } from '../styles/theme'

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
        <StyledBackground>
        </StyledBackground>
        <StyledContent>
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

const StyledContent = styled.div`
  ${container.fvtl}
  ${selectors.eblc} { margin: 0 0 3rem 0; }
  padding: 3rem 5% 5rem;
  position: relative;
  width: 100%;

  > span, article {
    ${container.fvtl}
    color: ${props => props.theme.colors.white};
    max-width: 50rem;
    width: 90%;
  }

  > span { margin: 0 0 5rem 0; }

  @media ${media.wide} {
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

const StyledBackground = styled.div`
  background-image: url(${$$Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 70vw;
  position: realtive;
  width: 100%;

  @media ${media.wide} {
    height: 70vw;
    width: 80%;
  }
`;

const StyledRoot = styled.div`
  overflow-y: visible;
  position: relative;
  width: 100%;

  > * { flex: 0 0 auto; }

  @media ${media.wide} {
    ${container.fvbc}
    width: 100%;
    max-height: 100rem;
  }
`
