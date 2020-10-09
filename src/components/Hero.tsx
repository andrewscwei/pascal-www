import $$AppStoreButton from '!!raw-loader!../assets/app-store-button.svg';
import { container } from 'promptu';
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

interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {}

class Hero extends PureComponent<Props, State> {
  render() {
    const { ltxt } = this.props.i18n;

    return (
      <StyledRoot>
        <StyledContent>
          <StyledTitle dangerouslySetInnerHTML={{ __html: ltxt('app-description') }}/>
          <StyledAppStoreButton href={__APP_CONFIG__.appStoreUrl} dangerouslySetInnerHTML={{ __html: $$AppStoreButton }}/>
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
)(Hero);

const StyledAppStoreButton = styled.a`
  margin-top: 4rem;
  height: 6rem;
  width: auto;
`;

const StyledContent = styled.div`
  ${container.fvtl}
  max-width: 50rem;
`;

const StyledTitle = styled.h1`
  ${props => props.theme.fonts.h1}
  color: ${props => props.theme.colors.white};
`;

const StyledRoot = styled.div`
  ${container.fvcr}
  padding: 5% 5%;
  background: ${props => props.theme.colors.black};
  height: 100%;
`;
