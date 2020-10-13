import { align, container, media, selectors } from 'promptu'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled, { css } from 'styled-components'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'
import Background from './Background'

interface StateProps {
  i18n: I18nState
}

interface DispatchProps {}

interface OwnProps {
  isActive: boolean
  slug: string
  numFeatures: number
  contentAlignment: ContentAlignment
}

type ContentAlignment = 'left' | 'center' | 'right'

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {}

class Feature extends PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    isActive: false,
    numFeatures: 2,
    contentAlignment: 'left',
  }

  render() {
    const { slug, numFeatures, contentAlignment, i18n } = this.props
    const { ltxt, locale } = i18n

    return (
      <StyledRoot contentAlignment={contentAlignment}>
        <StyledBackground contentAlignment={contentAlignment}>
          <Background slug={slug}/>
        </StyledBackground>
        <StyledContent contentAlignment={contentAlignment}>
          <span>
            <h2 dangerouslySetInnerHTML={{ __html: ltxt(`${slug}-title`) }}/>
            <h4 dangerouslySetInnerHTML={{ __html: ltxt(`${slug}-subtitle`) }}/>
          </span>
          {[...Array(numFeatures)].map((v, i) => (
            <article key={`copy-${i}`}>
              <h3 dangerouslySetInnerHTML={{ __html: ltxt(`${slug}-feature-${i+1}-title`) }}/>
              <span dangerouslySetInnerHTML={{ __html: ltxt(`${slug}-feature-${i+1}-description`) }}/>
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
  (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({

  }, dispatch),
)(Feature)

const StyledContent = styled.div<{
  contentAlignment: ContentAlignment
}>`
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

  @media ${media.gtw(700)} {
    padding: 5rem 8%;

    ${props => {
      switch (props.contentAlignment) {
        case 'left': return css`
          ${container.fvcl}
          ${selectors.eblc} { margin: 0 0 5rem 0; }

          > span, article {
            width: 30%;
            max-width: 36rem;
          }

          > span { ${container.fvtl} }
          > article { ${container.fvtl} }
        `
        case 'right': return css`
          ${container.fvcr}
          ${selectors.eblc} { margin: 0 0 5rem 0; }

          > span, article {
            width: 30%;
            max-width: 36rem;
          }

          > span { ${container.fvtl} }
          > article { ${container.fvtl} }
        `
        default: return css`
          ${container.fhtc}
          ${selectors.eblc} { margin: 0 7rem 0 0; }

          > span { ${container.fvtr} }

          > article {
            ${container.fvtl}
            width: 30%;
            max-width: 30rem;
          }
        `
      }
    }}
  }
`

const StyledBackground = styled.div<{
  contentAlignment: ContentAlignment
}>`
  width: 100%;
  height: 120vw;

  @media ${media.gtw(700)} {
    ${props => {
      switch (props.contentAlignment) {
        case 'left': return css`
          ${align.br}
          right: -15%;
          height: 80%;
        `
        case 'right': return css`
          ${align.bl}
          left: -15%;
          height: 80%;
        `
        default: return css`
          ${align.tc}
          height: 80%;
        `
      }
    }}
  }
`;

const StyledRoot = styled.div<{
  contentAlignment: ContentAlignment
}>`
  overflow: hidden;
  position: relative;
  width: 100%;

  @media ${media.gtw(700)} {
    width: 100%;
    height: 100%;
    min-height: 90rem;
    max-height: 60vw;

    ${props => {
      switch (props.contentAlignment) {
        case 'left': return css`
          ${container.fvcl}
          `
        case 'right': return css`
          ${container.fvcr}
        `
        default: return css`
          ${container.fvbc}
        `
      }
    }}
  }
`
