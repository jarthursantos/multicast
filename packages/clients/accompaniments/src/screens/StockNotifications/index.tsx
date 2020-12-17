import React, { useContext } from 'react'

import { Pager } from '@shared/web-components/Pager'

import { HomeScreenContext } from '~/screens/context'
import { StockNotificationsArrival } from '~/screens/StockNotifications/Arrival'
import { StockNotificationsFinish } from '~/screens/StockNotifications/Finish'
import { StockNotificationsRelease } from '~/screens/StockNotifications/Release'
import { StockNotificationTabs } from '~/screens/types'

const StockNotificationsScreen: React.FC = () => {
  const { currentStockNotificationTab } = useContext(HomeScreenContext)

  return (
    <Pager currentPage={currentStockNotificationTab}>
      <Pager.Page name={StockNotificationTabs.ARRIVAL}>
        <StockNotificationsArrival />
      </Pager.Page>

      <Pager.Page name={StockNotificationTabs.RELEASE}>
        <StockNotificationsRelease />
      </Pager.Page>

      <Pager.Page name={StockNotificationTabs.FINISH}>
        <StockNotificationsFinish />
      </Pager.Page>
    </Pager>
  )
}

export { StockNotificationsScreen }
