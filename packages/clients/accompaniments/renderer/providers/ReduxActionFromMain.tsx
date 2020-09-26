import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ipcRenderer, IpcRendererEvent } from 'electron'

const ReduxActionFromMain: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleReplyAction = (_: IpcRendererEvent, action: any) => {
      dispatch(action)
    }

    ipcRenderer.on('redux-action', handleReplyAction)

    return () => {
      ipcRenderer.removeListener('redux-action', handleReplyAction)
    }
  }, [dispatch])

  return <>{children}</>
}

export { ReduxActionFromMain }
