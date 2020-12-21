import { useState } from 'react'

import { ipcRenderer } from 'electron'

import { OPEN_RECEIPT, OPEN_RECEIPT_PAYLOAD } from './types'

export function openReceiptWindow(filename: string, url: string) {
  ipcRenderer.send(OPEN_RECEIPT, filename, url)
}

export function useReceiptPayload(): [string, string] {
  const [filename, setFilename] = useState<string>()
  const [url, setURL] = useState<string>()

  ipcRenderer.once(OPEN_RECEIPT_PAYLOAD, (_, filename: string, url: string) => {
    setFilename(filename)
    setURL(url)
  })

  return [filename, url]
}
