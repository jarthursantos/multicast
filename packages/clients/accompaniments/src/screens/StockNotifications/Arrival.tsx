import React from 'react'

import {
  useArrivedProviders,
  useArrivedProducts,
  useSetArrivedProvider
} from './context'
import { StockNotificationPresenter } from './Presenter'

const StockNotificationsArrival: React.FC = () => {
  const providers = useArrivedProviders()
  const products = useArrivedProducts()

  const handleSetSelection = useSetArrivedProvider()

  return (
    <StockNotificationPresenter
      onChangeSelection={handleSetSelection}
      products={products}
      providers={providers}
      productsColumns={[
        {
          title: 'Entrada',
          width: 120,
          hozAlign: 'center',
          field: 'arrivedAt',
          sorter: 'datetime',
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

export { StockNotificationsArrival }
