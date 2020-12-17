import React from 'react'

import { StockNotificationPresenter } from './Presenter'

const StockNotificationsFinish: React.FC = () => {
  return (
    <StockNotificationPresenter
      productsColumns={[
        {
          title: 'Término',
          width: 120,
          hozAlign: 'center',
          sorter: 'datetime',
          field: 'arrivedAt'
        }
      ]}
    />
  )
}

export { StockNotificationsFinish }
