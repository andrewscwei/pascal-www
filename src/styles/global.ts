import { normalize } from 'promptu'
import { css } from 'styled-components'
import * as theme from './theme'

export default css`
  ${normalize()} /* stylelint-disable-line max-empty-lines */

  html,
  body {
    background: ${theme.colors.background};
    font-family: ProximaNova, sans-serif;
    height: 100%;
    width: 100%;
  }

  h1 { ${theme.fonts.h1} }
  h2 { ${theme.fonts.h2} }
  h3 { ${theme.fonts.h3} }
  h4 { ${theme.fonts.h4} }
  span, p, li { ${theme.fonts.p1} }
`
