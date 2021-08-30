import { Reducer, ReducersMapObject } from 'redux'
import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import { History, createBrowserHistory } from 'history'

export const history = createBrowserHistory()

export default function createReducer (injectedReducers: ReducersMapObject = {}, historyParams: History = history): Reducer<any> {
  const rootReducer = combineReducers({
    router: connectRouter(historyParams),
    ...injectedReducers
  })
  return rootReducer
}
