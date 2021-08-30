import { ReducersMapObject, combineReducers, Reducer } from 'redux'
import store from './index'
import createReducer from './reducers'

export const makeAllReducer = (reducers: ReducersMapObject) => combineReducers({ ...reducers })

export const useInjectReducer = ({ key, reducer }: { key: string, reducer: Reducer }) => {
  if (Reflect.has(store.injectedReducers, key) && store.injectedReducers[key] === reducer) {
    return
  }

  store.injectedReducers[key] = reducer
  store.replaceReducer(createReducer(store.injectedReducers))
}

// export default injectedReducer
