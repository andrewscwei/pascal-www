import _ from 'lodash'
import { combineReducers, createStore } from 'redux'
import i18n, { I18nState } from './i18n'

export interface AppState {
  i18n: I18nState
}

export const reducer = combineReducers({ i18n })

const initialState = window.__INITIAL_STATE__
delete window.__INITIAL_STATE__

const store = createStore(reducer, initialState || {})

window.snapSaveState = () => ({
  __INITIAL_STATE__: _.omit(store.getState(), 'i18n'),
})

export default store
