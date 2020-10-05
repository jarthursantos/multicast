import { useCallback } from 'react'

import { ipcRenderer } from 'electron'

import { useTypedSelector } from '~/store'

export function useOpenWindow(windowName: string) {
  const { token } = useTypedSelector(state => state.auth)

  return useCallback(
    (...args: any[]) => {
      ipcRenderer.send(`open${windowName}`, ...args, token)
    },
    [windowName, token]
  )
}
