import { createStore, applyMiddleware, compose, Store, ReducersMapObject } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { fromJS } from 'immutable'
import createSagaMiddleware, { Task, SagaIterator } from 'redux-saga'
import createReducer, { history } from './reducers'

export * from './reducers'
export * from './reducerUtils'
export * from './sagaUtils'

export interface IStore<T> extends Store<T> {
   runSaga?: (saga: (...args: any[]) => SagaIterator, ...args: any[]) => Task
   injectedReducers: ReducersMapObject
   injectedSagas: { [key: string]: () => SagaIterator }
}

declare interface IWindow extends Window {
  // __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
declare const window: IWindow

export function configureStore<T> (initialState = {}): IStore<T> {
  let composeEnhancers = compose
  const reduxSagaMonitorOptions = {}

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    }

    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   }
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)
  // sagaMiddleware: Makes redux-sagas work
  // routerMiddleware: Syncs the location/URL path to the state
  const middleware = [sagaMiddleware, routerMiddleware(history)]

  const enhancers = [applyMiddleware(...middleware)]

  const store: IStore<T> = createStore(
    createReducer(),
    fromJS(initialState) as undefined,
    composeEnhancers(...enhancers)
  )

  // Extensions
  store.runSaga = sagaMiddleware.run
  store.injectedReducers = {} // Reducer registry
  store.injectedSagas = {} // Saga registry

  return store
}

export default configureStore()
