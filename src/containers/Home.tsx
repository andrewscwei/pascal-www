import { DirtyInfo, DirtyType, ScrollDelegate, UpdateDelegator } from 'dirty-dom'
import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Action, bindActionCreators, Dispatch } from 'redux'
import Extensions from '../components/Extensions'
import Feature from '../components/Feature'
import Hero from '../components/Hero'
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

}

class Home extends PureComponent<Props, State> implements UpdateDelegator {

  scrollDelegate?: ScrollDelegate

  componentDidMount() {
    document.title = this.props.i18n.ltxt('home-page-title')

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
      console.log(this.scrollDelegate?.minPosition, this.scrollDelegate?.maxPosition)
    }
  }

  render() {
    const { ltxt } = this.props.i18n

    return (
      <Fragment>
        <Hero/>
        <Feature slug='scientific' numFeatures={3} contentAlignment='left'/>
        <Feature slug='graphing' numFeatures={2} contentAlignment='center'/>
        <Feature slug='programmer' numFeatures={3} contentAlignment='right'/>
        <Extensions/>
      </Fragment>
    )
  }
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
  (dispatch: Dispatch<Action>): DispatchProps => bindActionCreators({

  }, dispatch),
)(Home)
