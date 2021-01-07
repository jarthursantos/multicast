import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { IBuyer } from '../index'
import {
  OPEN_BUYER_FINDER_WINDOW,
  OPEN_BUYER_FINDER_WINDOW_RESULT,
  OPEN_BUYER_FINDER_WINDOW_PAYLOAD
} from './types'

export function openBuyerFinderWindow(single = false) {
  const buyers: IBuyer[] = ipcRenderer.sendSync(
    OPEN_BUYER_FINDER_WINDOW,
    single
  )

  return buyers
}

export function replyBuyers(buyers: IBuyer[]) {
  ipcRenderer.send(OPEN_BUYER_FINDER_WINDOW_RESULT, buyers)
}

export function useBuyerFinderOptions(): boolean {
  const [single, setSingle] = useState<boolean>()

  ipcRenderer.once(OPEN_BUYER_FINDER_WINDOW_PAYLOAD, (_, single: boolean) =>
    setSingle(single)
  )

  return single
}
