import { DirtyInfo, DirtyType, ScrollDelegate, UpdateDelegator } from 'dirty-dom';
import { align, container } from 'promptu';
import React, { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Action, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Scientific from '../components/Scientific';
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

class Home extends PureComponent<Props, State> implements UpdateDelegator {

  nodeRefs = {
    root: createRef<HTMLDivElement>(),
    scroller: createRef<HTMLDivElement>(),
    body: createRef<HTMLDivElement>(),
  };

  scrollDelegate?: ScrollDelegate;

  componentDidMount() {
    document.title = this.props.i18n.ltxt('home-page-title');

    this.scrollDelegate = new ScrollDelegate(this);
    this.scrollDelegate.scrollTarget = () => this.nodeRefs.body.current;
    this.scrollDelegate.scrollContainer = () => this.nodeRefs.scroller.current;
    this.scrollDelegate.init();
  }

  componentWillUnmount() {
    this.scrollDelegate?.deinit();
    this.scrollDelegate = undefined;
  }

  update(info: DirtyInfo) {
    const { [DirtyType.POSITION]: position, [DirtyType.SIZE]: size, [DirtyType.INPUT]: input } = info;

    if (position) {
      console.log(this.scrollDelegate?.minPosition, this.scrollDelegate?.maxPosition);
    }
  }

  render() {
    const { ltxt } = this.props.i18n;

    return (
      <StyledRoot ref={this.nodeRefs.root}>
        <StyledScroller ref={this.nodeRefs.scroller}/>
        <StyledBody ref={this.nodeRefs.body}>
          <Hero/>
          <Scientific/>
          <Footer/>
        </StyledBody>
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
)(Home);

const StyledScroller = styled.div`
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

const StyledBody = styled.div`
  ${container.box}
  ${align.ftl}
  width: 100%;
  height: 100%;
`;

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
`;
