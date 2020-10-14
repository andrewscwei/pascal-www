import { DirtyInfo, DirtyType, Rect, ScrollDelegate, UpdateDelegator } from 'dirty-dom'
import _ from 'lodash'
import React, { createRef, Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Action, bindActionCreators, Dispatch } from 'redux'
import Extensions from '../components/Extensions'
import Graphing from '../components/Graphing'
import Hero from '../components/Hero'
import Programmer from '../components/Programmer'
import Scientific from '../components/Scientific'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'

interface StateProps {
  i18n: I18nState
}

interface DispatchProps {

}

type OwnProps = RouteComponentProps<{

}>

export interface Props extends StateProps, DispatchProps, OwnProps {}

export interface State {
  hero?: number;
  scientific?: number;
  graphing?: number;
  programmer?: number;
  extensions?: number;
}

class Home extends PureComponent<Props, State> implements UpdateDelegator {

  state: State = {}

  nodeRefs = {
    hero: createRef<HTMLDivElement>(),
    scientific: createRef<HTMLDivElement>(),
    graphing: createRef<HTMLDivElement>(),
    programmer: createRef<HTMLDivElement>(),
    extensions: createRef<HTMLDivElement>(),
  }

  scrollDelegate?: ScrollDelegate

  componentDidMount() {
    document.title = this.props.i18n.ltxt('home-page-title')
    window.scrollTo(0, 0)

    this.scrollDelegate = new ScrollDelegate(this)
    this.scrollDelegate.init()
  }

  componentWillUnmount() {
    this.scrollDelegate?.deinit()
    this.scrollDelegate = undefined
  }

  update(info: DirtyInfo) {
    const { [DirtyType.POSITION]: position, [DirtyType.SIZE]: size, [DirtyType.INPUT]: input } = info

    if (position) {
      this.setState({
        hero: this.computeExposureForElement(this.nodeRefs.hero.current),
        scientific: this.computeExposureForElement(this.nodeRefs.scientific.current),
        graphing: this.computeExposureForElement(this.nodeRefs.graphing.current),
        programmer: this.computeExposureForElement(this.nodeRefs.programmer.current),
        extensions: this.computeExposureForElement(this.nodeRefs.extensions.current),
      })
    }
  }

  render() {
    const { ltxt } = this.props.i18n

    return (
      <Fragment>
        <Hero ref={this.nodeRefs.hero} frame={this.state.hero ?? this.computeExposureForElement(this.nodeRefs.hero.current)}/>
        <Scientific ref={this.nodeRefs.scientific} frame={this.state.scientific ?? this.computeExposureForElement(this.nodeRefs.scientific.current)}/>
        <Graphing ref={this.nodeRefs.graphing} frame={this.state.graphing ?? this.computeExposureForElement(this.nodeRefs.graphing.current)}/>
        <Programmer ref={this.nodeRefs.programmer} frame={this.state.programmer ?? this.computeExposureForElement(this.nodeRefs.programmer.current)}/>
        <Extensions ref={this.nodeRefs.extensions} frame={this.state.extensions ?? this.computeExposureForElement(this.nodeRefs.extensions.current)}/>
      </Fragment>
    )
  }

  private computeExposureForElement(element?: HTMLElement | null): number {
    if (!element) return 0;

    const intersection = Rect.intersecting(element)
    const size = Rect.from(element)
    const min = 0.3
    const max = 0.7

    if (!intersection || !size) return 0

    const t = intersection.height / size.height
    return _.clamp((t - min) / (max - min), 0, 1)
  }
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
  (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({

  }, dispatch),
)(Home)
