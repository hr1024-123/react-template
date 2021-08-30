import store from './index'
import { useEffect } from 'react'
import { SagaIterator } from 'redux-saga'

export interface IDescriptor {
  key: string
  saga: () => SagaIterator
}

export function useInjectSaga ({ key, saga }: IDescriptor) {
  useEffect(() => {
    const hasSaga = Reflect.has(store.injectedSagas, key)

    if (!hasSaga) {
      store.injectedSagas[key] = saga
    }
  }, [])
}
