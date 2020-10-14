import { align, container, selectors } from 'promptu'
import React, { forwardRef, PureComponent, Ref } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import $$Background from '../assets/programmer@3x.png'
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

class Programmer extends PureComponent<Props> {
  render() {
    const { i18n, frame, forwardedRef } = this.props
    const { ltxt, locale } = i18n

    return (
      <StyledRoot ref={forwardedRef}>
        <StyledBackground>
        </StyledBackground>
        <StyledContent>
          <span>
            <h2 dangerouslySetInnerHTML={{ __html: ltxt('scientific-title') }}/>
            <h4 dangerouslySetInnerHTML={{ __html: ltxt('scientific-subtitle') }}/>
          </span>
          {[...Array(3)].map((v, i) => (
            <article key={`copy-${i}`}>
              <h3 dangerouslySetInnerHTML={{ __html: ltxt(`scientific-feature-${i+1}-title`) }}/>
              <span dangerouslySetInnerHTML={{ __html: ltxt(`scientific-feature-${i+1}-description`) }}/>
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
)(forwardRef<HTMLDivElement, Props>((props, ref) => <Programmer {...props} forwardedRef={ref}/>))

const StyledContent = styled.div`
  ${container.fvtl}
  ${selectors.eblc} { margin: 0 0 3rem 0; }
  padding: 5rem 5%;
  position: relative;
  width: 100%;

  > span {
    ${container.fvtl}
    color: ${props => props.theme.colors.white};
    margin: 0 0 5rem 0;
  }

  > article {
    ${container.fvtl}
    color: ${props => props.theme.colors.white};
    max-width: 26rem;
    width: 100%;

    h3 {
      + * { margin-top: 1.2rem }
    }

    span {
      ${props => props.theme.fonts.p1}
    }
  }

  @media ${media.wide} {
    ${container.fvcr}
    ${selectors.eblc} { margin: 0 0 5rem 0; }
    padding: 5rem 8%;

    > span, article {
      width: 30%;
      max-width: 36rem;
    }

    > span { ${container.fvtl} }
    > article { ${container.fvtl} }
  }
`

const StyledBackground = styled.div`
  background-image: url(${$$Background});
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 120vw;
  width: 100%;

  @media ${media.wide} {
    ${align.bl}
    left: -15%;
    height: 80%;
  }
`;

const StyledRoot = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;

  @media ${media.wide} {
    ${container.fvcr}
    width: 100%;
    height: 100%;
    min-height: 90rem;
    max-height: 60vw;
  }
`
