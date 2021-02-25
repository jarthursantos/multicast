import React from 'react'

import {
  useTerminatedProviders,
  useTerminatedProducts,
  useSetTerminatedProvider
} from './context'
import { StockNotificationPresenter } from './Presenter'

const StockNotificationsFinish: React.FC = () => {
  const providers = useTerminatedProviders()
  const products = useTerminatedProducts()

  const handleSetSelection = useSetTerminatedProvider()

  return (
    <StockNotificationPresenter
      onChangeSelection={handleSetSelection}
      products={products}
      providers={providers}
      productsColumns={[
        {
          title: 'Término',
          width: 120,
          hozAlign: 'center',
          sorter: 'datetime',
          field: 'terminationAt',
          sorterParams: {
            format: 'YYYY-MM-DD'
          },
          formatter: 'datetime',
          formatterParams: {
            inputFormat: 'YYYY-MM-DD',
            outputFormat: 'DD/MM/YYYY',
            invalidPlaceholder: '-'
          }
        }
      ]}
    />
  )
}

export { StockNotificationsFinish }
