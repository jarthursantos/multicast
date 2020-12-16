import { useEffect, DependencyList } from 'react'

import { EventEmitter } from 'events'

interface Action {
  type: string
}

class Watcher {
  private pendingActions: Action[]
  public emitter: EventEmitter

  constructor() {
    this.pendingActions = []
    this.emitter = new EventEmitter()

    this.emitter.setMaxListeners(100)
  }

  registerAction(action: Action) {
    this.pendingActions.push(action)
  }

  processActions() {
    this.pendingActions.forEach(action => {
      this.emitter.emit(action.type, action)
    })

    this.pendingActions = []
  }
}

const watcher = new Watcher()

const actionWatcherEnhancer = (createStore: any) => (
  reducer: any,
  initialState: any,
  enhancer: any
) => {
  const receivedReducer = (state: any, action: Action) => {
    watcher.registerAction(action)

    return reducer(state, action)
  }

  const store = createStore(receivedReducer, initialState, enhancer)

  store.subscribe(() => watcher.processActions())

  return store
}

function useWatchAction<T extends Action>(
  handler: (action?: T) => void,
  actionsTypes: string | string[],
  deps: DependencyList = []
) {
  useEffect(() => {
    const actions = Array.isArray(actionsTypes) ? actionsTypes : [actionsTypes]

    actions.forEach(action => watcher.emitter.addListener(action, handler))

    return () =>
      actions.forEach(action => watcher.emitter.removeListener(action, handler))
  }, [handler, actionsTypes, ...deps])
}

export { useWatchAction, actionWatcherEnhancer }
