import React from 'react'

import { Ribbon } from '@shared/web-components/Ribbon'

import { AccompanimentsScreen } from '~/screens/Accompaniments'
import { BillsToPayScreen } from '~/screens/BillsToPay'
import { HomeScreenContextProvider } from '~/screens/context'
import { RepresentativesScreen } from '~/screens/Representatives'
import { ScredulesScreen } from '~/screens/Scredules'
import { StockNotificationsScreen } from '~/screens/StockNotifications'
import { HomeTopBar } from '~/screens/TopBar'
import { HomeScreenTabs } from '~/screens/types'

const HomeScreen: React.VFC = () => {
  return (
    <HomeScreenContextProvider>
      <Ribbon>
        <HomeTopBar />

        <Ribbon.Container>
          <Ribbon.Content name={HomeScreenTabs.ACCOMPANIMENTS}>
            <AccompanimentsScreen />
          </Ribbon.Content>

          <Ribbon.Content name={HomeScreenTabs.SCHEDULES}>
            <ScredulesScreen />
          </Ribbon.Content>

          <Ribbon.Content name={HomeScreenTabs.BILLS_TO_PAY}>
            <BillsToPayScreen />
          </Ribbon.Content>

          <Ribbon.Content name={HomeScreenTabs.REPRESENTATIVES}>
            <RepresentativesScreen />
          </Ribbon.Content>

          <Ribbon.Content name={HomeScreenTabs.STOCK_NOTIFICATIONS}>
            <StockNotificationsScreen />
          </Ribbon.Content>
        </Ribbon.Container>
      </Ribbon>
    </HomeScreenContextProvider>
  )
}

export { HomeScreen }
