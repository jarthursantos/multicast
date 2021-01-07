import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { IProvider } from '../index'
import {
  OPEN_PROVIDER_FINDER_WINDOW,
  OPEN_PROVIDER_FINDER_WINDOW_RESULT,
  OPEN_PROVIDER_FINDER_WINDOW_PAYLOAD
} from './types'

export function openProviderFinderWindow(single = false) {
  const providers: IProvider[] = ipcRenderer.sendSync(
    OPEN_PROVIDER_FINDER_WINDOW,
    single
  )

  return providers
}

export function replyProviders(providers: IProvider[]) {
  ipcRenderer.send(OPEN_PROVIDER_FINDER_WINDOW_RESULT, providers)
}

export function useProviderFinderOptions(): boolean {
  const [single, setSingle] = useState<boolean>()

  ipcRenderer.once(OPEN_PROVIDER_FINDER_WINDOW_PAYLOAD, (_, single: boolean) =>
    setSingle(single)
  )

  return single
}
