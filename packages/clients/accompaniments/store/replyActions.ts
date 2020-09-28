import { ipcRenderer } from 'electron'

export const replyActions = () => (next: Function) => (action: any) => {
  const replyedAction = { ...action, _alreadyReplyed: true }

  if (action._alreadyReplyed || !action.propagate) {
    return next(replyedAction)
  }

  try {
    ipcRenderer.send('redux-action', replyedAction)
  } catch (error) {
    next(action)
  }
}
