import { align, container, selectors } from 'promptu'
import React, { forwardRef, PureComponent, Ref } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import $$Background from '../assets/scientific@3x.png'
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

class Scientific extends PureComponent<Props> {
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
)(forwardRef<HTMLDivElement, Props>((props, ref) => <Scientific {...props} forwardedRef={ref}/>))

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
    ${container.fvcl}
    ${selectors.eblc} { margin: 0 0 4% 0; }
    padding: 0 8%;

    > span, article {
      width: 36rem;
      max-width: 46%;
    }
  }
`

const StyledBackground = styled.div`
  background-image: url(${$$Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: auto 99%;
  height: 100vw;
  position: relative;
  width: 100%;

  @media ${media.wide} {
    ${align.br}
    background-position: right -30% bottom -200%;
    height: 110%;
  }
`;

const StyledRoot = styled.div`
  overflow-y: visible;
  position: relative;
  width: 100%;

  > * { flex: 0 0 auto; }

  @media ${media.wide} {
    ${container.fvcl}
    width: 100%;
    height: 66vw;
    max-height: 100rem;
  }
`
