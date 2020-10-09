import { css } from 'styled-components';
import * as theme from './theme';

export default css`
  html,
  body {
    background: ${theme.colors.background};
    font-family: ${theme.fonts.body};
    height: 100%;
    width: 100%;
  }
`;
