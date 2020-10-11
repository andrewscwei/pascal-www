import { container, selectors } from 'promptu';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { I18nState } from '../store/i18n';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {}

interface OwnProps {
  isActive: boolean;
  slug: string;
  numFeatures: number;
}

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {}

class Feature extends PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
    isActive: false,
    numFeatures: 2,
  };

  render() {
    const { slug, numFeatures, i18n } = this.props;
    const { ltxt, locale } = i18n;

    return (
      <StyledRoot>
        <StyledTitle>
          <h2 dangerouslySetInnerHTML={{ __html: ltxt(`${slug}-title`)}}/>
          <h4 dangerouslySetInnerHTML={{ __html: ltxt(`${slug}-subtitle`)}}/>
        </StyledTitle>
        <StyledContent>
          {[...Array(numFeatures)].map((v, i) => (
            <StyledCopy>
              <h3 dangerouslySetInnerHTML={{ __html: ltxt(`${slug}-feature-${i+1}-title`)}}/>
              <span dangerouslySetInnerHTML={{ __html: ltxt(`${slug}-feature-${i+1}-description`)}}/>
            </StyledCopy>
          ))}
        </StyledContent>
      </StyledRoot>
    );
  }
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
  (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({

  }, dispatch),
)(Feature);

const StyledTitle = styled.div`
  ${container.fvtl}
  color: ${props => props.theme.colors.white};
  margin: 10rem 5%;

  h2 {
    ${props => props.theme.fonts.h2}
  }

  h4 {
    ${props => props.theme.fonts.h4}
  }
`;

const StyledCopy = styled.div`
  ${container.fvtl}
  color: ${props => props.theme.colors.white};
  max-width: 28rem;
  width: 100%;

  h3 {
    ${props => props.theme.fonts.h3}
    + * { margin-top: 1.2rem; }
  }

  span {
    ${props => props.theme.fonts.p1}
  }
`;

const StyledContent = styled.div`
  ${container.fhtc}
  padding: 5rem 5%;
  width: 100%;

  ${selectors.eblc} {
    margin-right: 5rem;
  }
`;

const StyledRoot = styled.div`
  ${container.fvsl}
  background: ${props => props.theme.colors.black};
  width: 100%;
  min-height: 100%;
`;
