import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  HomeScreenContextHandles,
  AccompanimentTabs,
  StockNotificationTabs,
  RepresentativeTabs
} from '~/screens/types'
import { useTypedSelector } from '~/store'
import { loadAccompanimentsRequest } from '~/store/modules/accompaniments/actions'

export const HomeScreenContext = createContext<HomeScreenContextHandles>(
  undefined
)

const HomeScreenContextProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  const [currentAccompanimentTab, changeAccompanimentTab] = useState<
    AccompanimentTabs
  >(AccompanimentTabs.GENERAL_RESUME)

  const [currentStockNotificationTab, changeStockNotificationTab] = useState<
    StockNotificationTabs
  >(StockNotificationTabs.ARRIVAL)

  const [currentRepresentativeTab, changeRepresentativeTab] = useState<
    RepresentativeTabs
  >(RepresentativeTabs.ALL)

  const { loading } = useTypedSelector(store => store.accompaniments)

  useEffect(() => {
    dispatch(loadAccompanimentsRequest())
  }, [dispatch])

  return (
    <HomeScreenContext.Provider
      value={{
        isLoading: loading,
        currentAccompanimentTab,
        changeAccompanimentTab,
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
