import { normalize } from 'promptu';
import { css } from 'styled-components';
import * as theme from './theme';

export default css`
  ${normalize()} /* stylelint-disable-line max-empty-lines */

  html,
  body {
    background: ${theme.colors.background};
    font-family: ${theme.fonts.body};
    height: 100%;
    width: 100%;
  }
`;
