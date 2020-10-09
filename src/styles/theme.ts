import { media } from 'promptu';
import { css } from 'styled-components';

export const colors = {
  background: '#111',
  purple: '#7d24e2',
  blue: '#00a5e3',
  green: '#7d24e2',
  white: '#fff',
  black: '#111',
};

export const fonts = {
  body: 'ProximaNova, sans-serif',
  t1: css`
    font-family: ProximaNova, sans-serif;
    font-size: 2.4rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .3rem;

    @media ${media.gtmobile} {
      font-size: 3rem;
    }
  `,
  h1: css`
    font-family: ProximaNova, sans-serif;
    font-size: 3.4rem;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: .1rem;

    strong {
      font-weight: 700;
    }

    @media ${media.gtmobile} {
      font-size: 4rem;
    }
  `,
  n1: css`
    font-family: ProximaNova, sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
  `,
  f1: css`
    font-family: ProximaNova, sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
  `,
};
