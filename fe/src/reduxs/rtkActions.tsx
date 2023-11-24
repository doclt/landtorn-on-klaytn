import React, { createRef, forwardRef, useImperativeHandle } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { RootState } from './store'


type ActionBase<T = any> = {
  type: string
  payload?: T
}

const RXStoreComponent = forwardRef((_, ref) => {
  const dispatchRx = useAppDispatch()
  const store = useAppSelector(x => x)
  useImperativeHandle(
    ref,
    () => ({
      dispatch: (action: ActionBase) => {
        dispatchRx(action)
      },
      getState: (state: keyof RootState) => {
        return store[state]
      },
    }),
    [dispatchRx, store],
  )
  return null
})

type RXStoreType = {
  dispatch: (action: any) => any
  getState: <K extends keyof RootState>(
    selector: K,
  ) => RootState[K]
}

const storeRef = createRef<RXStoreType>()

export const RXStore = () => <RXStoreComponent ref={storeRef} />

export const dispatch = (action: any): any => {
  if (storeRef.current) {
    storeRef.current.dispatch(action)
  }
}
export function getState<K extends keyof RootState>(
  selector: K,
): RootState[K] {
  if (storeRef.current) {
    return storeRef.current.getState(selector)
  }
  return {} as RootState[K]
}
