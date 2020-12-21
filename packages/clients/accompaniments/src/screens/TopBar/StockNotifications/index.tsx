import React, { useContext } from 'react'
import { MdLockOpen, MdArrowDownward, MdArrowUpward } from 'react-icons/md'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { MdFilter } from '~/components/Icons'
import { HomeScreenContext } from '~/screens/context'
import { HomeScreenTabs, StockNotificationTabs } from '~/screens/types'

const HomeScreenTopBarStockNotifications: React.FC = () => {
  const {
    currentStockNotificationTab,
    changeStockNotificationTab
  } = useContext(HomeScreenContext)

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
        icon={<MdFilter />}
        onClick={console.log}
        width={80}
        label="Aplicar Filtro"
      />
    </TabOptions.Content>
  )
}

export { HomeScreenTopBarStockNotifications }
