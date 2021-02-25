import React, { useContext } from 'react'

import { LoadingPanel } from '@shared/web-components/LoadingPanel'
import { Pager } from '@shared/web-components/Pager'

import { HomeScreenContext } from '~/screens/context'
import { StockNotificationTabs } from '~/screens/types'
import { useTypedSelector } from '~/store'

import { StockNotificationsArrival } from './Arrival'
import { StockNotificationsContextProvider } from './context'
import { StockNotificationsFinish } from './Finish'
import { StockNotificationsRelease } from './Release'

const StockNotificationsScreen: React.FC = () => {
  const { currentStockNotificationTab } = useContext(HomeScreenContext)

  const { searching } = useTypedSelector(state => state.stockNotifications)

  return (
    <React.Fragment>
      <StockNotificationsContextProvider>
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
      </StockNotificationsContextProvider>

      <LoadingPanel isLoading={searching} />
    </React.Fragment>
  )
}

export { StockNotificationsScreen }
