import React, { useContext, useEffect } from 'react'
import {
  MdLockOpen,
  MdArrowDownward,
  MdArrowUpward,
  MdSearch
} from 'react-icons/md'
import { useDispatch } from 'react-redux'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { HomeScreenContext } from '~/screens/context'
import { HomeScreenTabs, StockNotificationTabs } from '~/screens/types'
import { searchStockNotificationsRequest } from '~/store/modules/stockNotifications/actions'

const HomeScreenTopBarStockNotifications: React.FC = () => {
  const {
    currentStockNotificationTab,
    changeStockNotificationTab
  } = useContext(HomeScreenContext)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      searchStockNotificationsRequest({
        buyers: [],
        providers: [],
        periodFrom: new Date(2021, 0, 1),
        periodTo: new Date(2021, 0, 31)
      })
    )
  }, [dispatch])

  return (
    <TabOptions.Content name={HomeScreenTabs.STOCK_NOTIFICATIONS}>
      <ButtonGroup
        currentButton={currentStockNotificationTab}
        onSelectionChange={changeStockNotificationTab}
      >
        <ButtonGroup.Button
          name={StockNotificationTabs.ARRIVAL}
          label="Chegada de Produtos"
          icon={<MdArrowDownward />}
          width={105}
        />

        <ButtonGroup.Button
          name={StockNotificationTabs.RELEASE}
          label="Liberação de Produtos"
          icon={<MdLockOpen />}
          width={108}
        />

        <ButtonGroup.Button
          name={StockNotificationTabs.FINISH}
          label="Término de Produtos"
          icon={<MdArrowUpward />}
          width={105}
        />
      </ButtonGroup>

      <TabOptions.Content.Separator />

      <ActionIconButton
        icon={<MdSearch />}
        onClick={console.log}
        width={80}
        label="Pesquisar Produtos"
      />
    </TabOptions.Content>
  )
}

export { HomeScreenTopBarStockNotifications }
