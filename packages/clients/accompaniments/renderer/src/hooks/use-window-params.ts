import { useState, useEffect } from 'react'

import { ipcRenderer, IpcRendererEvent } from 'electron'

export function useWindowParams<Params>() {
  const [params, setParams] = useState<Params>()

  useEffect(() => {
    const getParams = (_: IpcRendererEvent, data: Params) => {
      setParams(data)
    }

    ipcRenderer.on('params-sended', getParams)

    return () => {
      ipcRenderer.removeListener('params-sended', getParams)
    }
  }, [])

  return params
}
