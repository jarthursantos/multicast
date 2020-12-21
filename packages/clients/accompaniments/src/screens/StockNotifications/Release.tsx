import React from 'react'

import { StockNotificationPresenter } from './Presenter'

const StockNotificationsRelease: React.FC = () => {
  return (
    <StockNotificationPresenter
      productsColumns={[
        {
          title: 'Recebimento',
          width: 120,
          hozAlign: 'center',
          sorter: 'datetime',
          field: 'arrivedAt'
        },
        {
          title: 'Liberação',
          width: 120,
          hozAlign: 'center',
          sorter: 'datetime',
          field: 'arrivedAt'
        }
      ]}
    />
  )
}

export { StockNotificationsRelease }
