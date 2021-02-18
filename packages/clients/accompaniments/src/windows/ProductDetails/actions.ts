import { useState } from 'react'

import { ipcRenderer, IpcRendererEvent } from 'electron'

import { store } from '~/store'
import { RootState } from '~/store/state'

import {
  OPEN_PRODUCT_DETAILS,
  OPEN_PRODUCT_DETAILS_DATA,
  Product
} from './types'

export function openProductDetails(product: Product) {
  const state = store.getState() as RootState

  ipcRenderer.send(OPEN_PRODUCT_DETAILS, product, state.auth.token)
}

export function useProductDetailsPayload(): [Product, string] {
  const [product, setProduct] = useState<Product>()
  const [token, setToken] = useState<string>()

  ipcRenderer.once(
    OPEN_PRODUCT_DETAILS_DATA,
    (_: IpcRendererEvent, data: Product, token: string) => {
      setProduct(data)
      setToken(token)
    }
  )

  return [product, token]
}
