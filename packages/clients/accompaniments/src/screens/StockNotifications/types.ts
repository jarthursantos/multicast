import { IProvider } from '@shared/web-components'

import {
  ArrivedProduct,
  ReleasedProduct,
  TerminatedProduct
} from '~/store/modules/stockNotifications/types'

export interface StockNotificationsContextHandles {
  arrived: ArrivedProduct[]
  arrivedProvider?: IProvider
  setArrivedProvider(provider?: IProvider): void

  released: ReleasedProduct[]
  releasedProvider?: IProvider
  setReleasedProvider(provider?: IProvider): void

  terminated: TerminatedProduct[]
  terminatedProvider?: IProvider
  setTerminatedProvider(provider?: IProvider): void
}
