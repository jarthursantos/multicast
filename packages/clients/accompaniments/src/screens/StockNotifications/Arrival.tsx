import React from 'react'

import { StockNotificationPresenter } from './Presenter'

const StockNotificationsArrival: React.FC = () => {
  return (
    <StockNotificationPresenter
      productsColumns={[
        {
          title: 'Entrada',
          width: 120,
          hozAlign: 'center',
          sorter: 'datetime',
          field: 'arrivedAt'
        }
      ]}
    />
  )
}

export { StockNotificationsArrival }
