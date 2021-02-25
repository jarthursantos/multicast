import React from 'react'

import {
  useReleasedProviders,
  useReleasedProducts,
  useSetReleasedProvider
} from './context'
import { StockNotificationPresenter } from './Presenter'

const StockNotificationsRelease: React.FC = () => {
  const providers = useReleasedProviders()
  const products = useReleasedProducts()

  const handleSetSelection = useSetReleasedProvider()

  return (
    <StockNotificationPresenter
      onChangeSelection={handleSetSelection}
      products={products}
      providers={providers}
      productsColumns={[
        // {
        //   title: 'Recebimento',
        //   width: 120,
        //   hozAlign: 'center',
        //   sorter: 'datetime',
        //   field: 'arrivedAt',
        //   sorterParams: {
        //     format: 'YYYY-MM-DD'
        //   },
        //   formatter: 'datetime',
        //   formatterParams: {
        //     inputFormat: 'YYYY-MM-DD',
        //     outputFormat: 'DD/MM/YYYY',
        //     invalidPlaceholder: '-'
        //   }
        // },
        {
          title: 'Liberação',
          width: 120,
          hozAlign: 'center',
          sorter: 'datetime',
          field: 'releasedAt',
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

export { StockNotificationsRelease }
