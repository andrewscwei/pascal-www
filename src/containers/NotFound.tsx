import { container } from 'promptu'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Route, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { AppState } from '../store'
import { I18nState } from '../store/i18n'

interface StateProps {
  i18n: I18nState
}

interface Props extends StateProps, RouteComponentProps<{}> {}

class NotFound extends PureComponent<Props> {
  componentDidMount() {
    document.title = this.props.i18n.ltxt('not-found-page-title')

    window.scrollTo(0, 0)
  }

  render() {
    const { ltxt } = this.props.i18n
    return (
      <Route render={(route: RouteComponentProps<any>) => {
        if (route.staticContext) {
          route.staticContext.statusCode = 404
        }

        return (
          <StyledRoot>
            <h1>{ltxt('not-found-description') }</h1>
          </StyledRoot>
        )
      }}/>
    )
  }
}

export default connect(
  (state: AppState): StateProps => ({
    i18n: state.i18n,
  }),
)(NotFound)

const StyledRoot = styled.div`
  ${container.fvcc}
  min-height: 100%;
  padding: 10% 5%;
  width: 100%;
  color: ${props => props.theme.colors.white};

  h2 {
    max-width: 40rem;
    text-align: center;
  }
`
