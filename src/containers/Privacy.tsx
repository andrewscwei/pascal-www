import { container } from 'promptu';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { AppState } from '../store';
import { I18nState } from '../store/i18n';

interface StateProps {
  i18n: I18nState;
}

interface DispatchProps {

}

type OwnProps = RouteComponentProps<{

}>;

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {

}

class Privacy extends PureComponent<Props, State> {

  componentDidMount() {
    document.title = this.props.i18n.ltxt('privacy-page-title');

    window.scrollTo(0, 0);
  }

  render() {
    const { ltxt } = this.props.i18n;

    return (
      <StyledRoot>
        <StyledContent dangerouslySetInnerHTML={{ __html: __PRIVACY_POLICY__ }}/>
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
)(Privacy);

const StyledContent = styled.div`
  width: 100%;
  max-width: 50rem;
  color: ${props => props.theme.colors.white};

  h1 {
    ${props => props.theme.fonts.h2}

    + * {
      margin-top: 5rem;
    }
  }

  h2 {
    ${props => props.theme.fonts.h3}

    + * {
      margin-top: 1.4rem;
    }
  }

  blockquote {
    ${props => props.theme.fonts.p1}
    margin: 1rem 0;
    padding: 0;
    font-style: italic;

    + * {
      margin-top: 5rem;
    }
  }

  p, li {
    ${props => props.theme.fonts.p1}

    + p, + li {
      margin-top: 1rem;
    }

    + h1, + h2, + h3 {
      margin-top: 4rem;
    }
  }
`;

const StyledRoot = styled.div`
  ${container.fvtc}
  padding: 20rem 5%;
  width: 100%;
  min-height: 100%;
`;
