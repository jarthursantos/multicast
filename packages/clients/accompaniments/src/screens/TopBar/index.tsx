import React from 'react'

import { Ribbon, TabBar } from '@shared/web-components'

import { HomeScreenTopBarAccompaniment } from '~/screens/TopBar/Accompaniment'
import { HomeScreenTopBarBillsToPay } from '~/screens/TopBar/BillsToPay'
import { HomeScreenTopBarPurchaseResume } from '~/screens/TopBar/PurchaseResume'
import { HomeScreenTopBarRepresentatives } from '~/screens/TopBar/Representatives'
import { HomeScreenTopBarRevenues } from '~/screens/TopBar/Revenues'
import { HomeScreenTopBarSalesByProvider } from '~/screens/TopBar/SalesByProvider'
import { HomeScreenTopBarSchedule } from '~/screens/TopBar/Schedule'
import { HomeScreenTopBarStockNotifications } from '~/screens/TopBar/StockNotifications'
import { HomeScreenTopBarStockPosition } from '~/screens/TopBar/StockPosition'
import { HomeScreenTabs } from '~/screens/types'

const HomeTopBar: React.VFC = () => {
  return (
    <>
      <Ribbon.Bar initialTab={HomeScreenTabs.ACCOMPANIMENTS}>
        <TabBar.Button name={HomeScreenTabs.ACCOMPANIMENTS} label="Pedidos" />

        <TabBar.Button name={HomeScreenTabs.SCHEDULES} label="Agenda" />

        <TabBar.Button
          name={HomeScreenTabs.BILLS_TO_PAY}
          label="Contas a Pagar"
        />

        <TabBar.Button
          name={HomeScreenTabs.STOCK_NOTIFICATIONS}
          label="Notificações do Estoque"
        />

        <TabBar.Button
          name={HomeScreenTabs.REPRESENTATIVES}
          label="Representantes"
        />

        <TabBar.Button
          name={HomeScreenTabs.PURCHASES_RESUME}
          label="Resumo de Compras"
        />

        <TabBar.Button name={HomeScreenTabs.REVENUES} label="Faturamento" />

        <TabBar.Button
          name={HomeScreenTabs.STOCK_POSITION}
          label="Posição de Estoque"
        />

        <TabBar.Button
          name={HomeScreenTabs.SALES_BY_PROVIDER}
          label="Venda por Fornecedor"
        />
      </Ribbon.Bar>

      <Ribbon.Options>
        <HomeScreenTopBarAccompaniment />

        <HomeScreenTopBarSchedule />

        <HomeScreenTopBarBillsToPay />

        <HomeScreenTopBarStockNotifications />

        <HomeScreenTopBarRepresentatives />

        <HomeScreenTopBarPurchaseResume />

        <HomeScreenTopBarRevenues />

        <HomeScreenTopBarStockPosition />

        <HomeScreenTopBarSalesByProvider />
      </Ribbon.Options>
    </>
  )
}

export { HomeTopBar }
