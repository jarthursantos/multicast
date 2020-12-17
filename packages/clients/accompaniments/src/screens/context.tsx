import React, { createContext, useState } from 'react'

import {
  HomeScreenContextHandles,
  AccompanimentTabs,
  ScheduleTabs,
  StockNotificationTabs,
  RepresentativeTabs
} from '~/screens/types'

export const HomeScreenContext = createContext<HomeScreenContextHandles>(
  undefined
)

const HomeScreenContextProvider: React.FC = ({ children }) => {
  const [currentAccompanimentTab, changeAccompanimentTab] = useState<
    AccompanimentTabs
  >(AccompanimentTabs.GENERAL_RESUME)

  const [currentScheduleTab, changeScheduleTab] = useState<ScheduleTabs>(
    ScheduleTabs.DAY
  )

  const [currentStockNotificationTab, changeStockNotificationTab] = useState<
    StockNotificationTabs
  >(StockNotificationTabs.ARRIVAL)

  const [currentRepresentativeTab, changeRepresentativeTab] = useState<
    RepresentativeTabs
  >(RepresentativeTabs.ALL)

  return (
    <HomeScreenContext.Provider
      value={{
        currentAccompanimentTab,
        changeAccompanimentTab,
        currentScheduleTab,
        changeScheduleTab,
        currentStockNotificationTab,
        changeStockNotificationTab,
        currentRepresentativeTab,
        changeRepresentativeTab
      }}
    >
      {children}
    </HomeScreenContext.Provider>
  )
}

export { HomeScreenContextProvider }
