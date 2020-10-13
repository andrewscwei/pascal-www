import { container } from 'promptu'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'
import $$Extensions from '../assets/extensions@2x.png'
import $$Graphing from '../assets/graphing@2x.png'
import $$Programmer from '../assets/programmer@2x.png'
import $$Scientific from '../assets/scientific@2x.png'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'

interface StateProps {
  i18n: I18nState
}

interface DispatchProps {}

interface OwnProps {
  slug: string
}

export interface Props extends StateProps, DispatchProps, OwnProps {
  className?: string;
  isActive: boolean
}

export interface State {}

class Background extends PureComponent<Props, State> {
  static defaultProps: Partial<Props> = {
  }

  render() {
    const { className, slug } = this.props;

    return (
      <StyledRoot className={className}>
        {slug === 'scientific' && <StyledScientific/>}
        {slug === 'graphing' && <StyledGraphing/>}
        {slug === 'programmer' && <StyledProgrammer/>}
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
)(Background)

const StyledScientific = styled.figure`
  background-image: url(${$$Scientific});
  background-position: bottom center;
`;

const StyledGraphing = styled.figure`
  background-image: url(${$$Graphing});
  background-position: top center;
`;

const StyledProgrammer = styled.figure`
  background-image: url(${$$Programmer});
  background-position: bottom left;
`;

const StyledRoot = styled.div`
  ${container.box}
  width: 100%;
  height: 100%;

  > * {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
  }
`
