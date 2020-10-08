import React, { useCallback, useState } from 'react'
import {
  MdDashboard,
  MdRefresh,
  MdEvent,
  MdGroup,
  MdPerson,
  MdShoppingCart,
  MdLockOpen,
  MdArrowDownward,
  MdArrowUpward,
  MdLocalShipping,
  MdTrendingUp,
  MdPublic,
  MdCompare,
  MdTrackChanges,
  MdInbox,
  MdAssignmentLate,
  MdToday
} from 'react-icons/md'
import LoadingIndicator from 'react-loading'
import { useDispatch } from 'react-redux'

import Head from 'next/head'

import { ActionIconButton, ButtonGroup } from '@shared/web-components/Button'
import { Pager } from '@shared/web-components/Pager'
import { Ribbon, TabBar, TabOptions } from '@shared/web-components/Ribbon'

import Backdrop from '~/components/Backdrop'
import { MdBarChart } from '~/components/Icons/BarChart'
import { MdFilter } from '~/components/Icons/Filter'
import { MdPendingAction } from '~/components/Icons/PendingAction'
import { MdReceiptLong } from '~/components/Icons/ReceiptLong'
import { MdTableChart } from '~/components/Icons/TableChart'
import BillstoPay from '~/pages/BillstoPay'
import Dashboard from '~/pages/Dashboard'
import InProgress from '~/pages/InProgress'
import PurchaseResume from '~/pages/PurchaseResume'
import Receiving from '~/pages/Receiving'
import Representatives from '~/pages/Representatives'
import Revenues from '~/pages/Revenues'
import SalesByProvider from '~/pages/SalesByProvider'
import Schedule from '~/pages/Schedule'
import Stock from '~/pages/Stock'
import StockPosition from '~/pages/StockPosition'
import { useTypedSelector } from '~/store'
import { StoreContextProvider } from '~/store/context'
import { loadAccompanimentsRequestAction } from '~/store/modules/accompaniments/actions'

const Home = () => {
  const dispatch = useDispatch()

  const { loading } = useTypedSelector(state => state.accompaniments)

  const [currentPage, setPage] = useState<string>()
  const [currentStockPage, setStockPage] = useState<string>()
  const [currentRepresentativePage, setRepresentativePage] = useState<string>()
  const [currentPurchaseResumePage, setPurchaseResumePage] = useState<string>()
  const [currentRevenuesPage, setRevenuesPage] = useState<string>()
  const [currentStockPositionPage, setStockPositionPage] = useState<string>()
  const [currentSalesByProviderPage, setSalesByProviderPage] = useState<
    string
  >()

  const handleRefresh = useCallback(() => {
    dispatch(loadAccompanimentsRequestAction())
  }, [dispatch])

  return (
    <StoreContextProvider>
      <Head>
        <title>FollowUP Compras - Pedidos - Em Andamento - A Enviar</title>
      </Head>

      <Ribbon>
        <Ribbon.Bar initialTab="accompaniments">
          <TabBar.Button name="accompaniments" label="Pedidos" />
          <TabBar.Button name="schedule" label="Agenda" />
          <TabBar.Button name="billsToPay" label="Contas a Pagar" />
          <TabBar.Button name="stock" label="Notificações do Estoque" />
          <TabBar.Button name="representatives" label="Representantes" />
          <TabBar.Button name="purchaseResume" label="Resumo de Compras" />
          <TabBar.Button name="revenues" label="Faturamento" />
          <TabBar.Button name="stockPosition" label="Posição de Estoque" />
          <TabBar.Button name="salesByProvider" label="Venda por Fornecedor" />
        </Ribbon.Bar>

        <Ribbon.Options>
          <TabOptions.Content name="accompaniments">
            <ButtonGroup initialButton="resume" onSelectionChange={setPage}>
              <ButtonGroup.Button
                name="resume"
                label="Resumo Geral"
                icon={<MdDashboard />}
                width={85}
              />

              <ButtonGroup.Button
                name="inProgress"
                label="Em Andamento"
                icon={<MdPendingAction />}
                width={95}
              />

              <ButtonGroup.Button
                name="inReceivement"
                label="Em Recebimento"
                icon={<MdReceiptLong />}
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

            <ActionIconButton
              icon={<MdRefresh />}
              onClick={handleRefresh}
              width={85}
              label="Recarregar Dados"
            />
          </TabOptions.Content>

          <TabOptions.Content name="schedule">
            <ActionIconButton
              icon={<MdEvent />}
              onClick={console.log}
              width={105}
              label="Adicionar Agendamento"
            />

            <TabOptions.Content.Separator />

            <ActionIconButton
              icon={<MdFilter />}
              onClick={console.log}
              width={80}
              label="Aplicar Filtro"
            />

            <ActionIconButton
              icon={<MdRefresh />}
              onClick={handleRefresh}
              width={85}
              label="Recarregar Dados"
            />
          </TabOptions.Content>

          <TabOptions.Content name="billsToPay">
            <ActionIconButton
              icon={<MdFilter />}
              onClick={console.log}
              width={80}
              label="Aplicar Filtro"
            />

            <ActionIconButton
              icon={<MdRefresh />}
              onClick={handleRefresh}
              width={85}
              label="Recarregar Dados"
            />
          </TabOptions.Content>

          <TabOptions.Content name="stock">
            <ButtonGroup
              initialButton="arrival"
              onSelectionChange={setStockPage}
            >
              <ButtonGroup.Button
                name="arrival"
                label="Chegada de Produtos"
                icon={<MdArrowDownward />}
                width={105}
              />

              <ButtonGroup.Button
                name="release"
                label="Liberação de Produtos"
                icon={<MdLockOpen />}
                width={108}
              />

              <ButtonGroup.Button
                name="finish"
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

            <ActionIconButton
              icon={<MdRefresh />}
              onClick={handleRefresh}
              width={85}
              label="Recarregar Dados"
            />
          </TabOptions.Content>

          <TabOptions.Content name="representatives">
            <ButtonGroup
              initialButton="general"
              onSelectionChange={setRepresentativePage}
            >
              <ButtonGroup.Button
                name="general"
                label="Tabela Geral"
                icon={<MdGroup />}
                width={80}
              />

              <ButtonGroup.Button
                name="perRepresentative"
                label="Agrupar por Representante"
                icon={<MdPerson />}
                width={108}
              />

              <ButtonGroup.Button
                name="perBuyer"
                label="Agrupar por Comprador"
                icon={<MdShoppingCart />}
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

            <ActionIconButton
              icon={<MdRefresh />}
              onClick={handleRefresh}
              width={85}
              label="Recarregar Dados"
            />
          </TabOptions.Content>

          <TabOptions.Content name="purchaseResume">
            <ButtonGroup
              initialButton="fromProvider"
              onSelectionChange={setPurchaseResumePage}
            >
              <ButtonGroup.Button
                name="fromProvider"
                label="Por Fornecedor"
                icon={<MdLocalShipping />}
                width={85}
              />

              <ButtonGroup.Button
                name="fromEvolution"
                label="Por Evolução"
                icon={<MdTrendingUp />}
                width={80}
              />

              <ButtonGroup.Button
                name="fromState"
                label="Por Estado"
                icon={<MdPublic />}
                width={80}
              />

              <ButtonGroup.Button
                name="fromBuyer"
                label="Por Comprador"
                icon={<MdShoppingCart />}
                width={85}
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

          <TabOptions.Content name="revenues">
            <ButtonGroup
              initialButton="data"
              onSelectionChange={setRevenuesPage}
            >
              <ButtonGroup.Button
                name="data"
                label="Dados"
                icon={<MdTableChart />}
                width={80}
              />

              <ButtonGroup.Button
                name="graphs"
                label="Gráficos"
                icon={<MdBarChart />}
                width={80}
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

          <TabOptions.Content name="stockPosition">
            <ButtonGroup
              initialButton="general"
              onSelectionChange={setStockPositionPage}
            >
              <ButtonGroup.Button
                name="general"
                label="Estoque Geral"
                icon={<MdInbox />}
                width={80}
              />

              <ButtonGroup.Button
                name="syntheticMovement"
                label="Movimento Sintético"
                icon={<MdTrackChanges />}
                width={90}
              />

              <ButtonGroup.Button
                name="master"
                label="Master"
                icon={<MdAssignmentLate />}
                width={80}
              />

              <ButtonGroup.Button
                name="comparative"
                label="Comparativo"
                icon={<MdCompare />}
                width={95}
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

          <TabOptions.Content name="salesByProvider">
            <ButtonGroup
              initialButton="data"
              onSelectionChange={setSalesByProviderPage}
            >
              <ButtonGroup.Button
                name="data"
                label="Dados"
                icon={<MdTableChart />}
                width={80}
              />

              <ButtonGroup.Button
                name="month"
                label="Por Mês"
                icon={<MdToday />}
                width={80}
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
        </Ribbon.Options>

        <Ribbon.Container>
          <Ribbon.Content name="accompaniments">
            <Pager currentPage={currentPage}>
              <Pager.Page name="resume">
                <Dashboard />
              </Pager.Page>

              <Pager.Page name="inProgress">
                <InProgress />
              </Pager.Page>

              <Pager.Page name="inReceivement">
                <Receiving />
              </Pager.Page>
            </Pager>

            {loading && (
              <Backdrop>
                <LoadingIndicator
                  color="#333"
                  type="spin"
                  width={40}
                  height={40}
                />
              </Backdrop>
            )}
          </Ribbon.Content>

          <Ribbon.Content name="schedule">
            <Schedule />
          </Ribbon.Content>

          <Ribbon.Content name="billsToPay">
            <BillstoPay />
          </Ribbon.Content>

          <Ribbon.Content name="stock">
            <Pager currentPage={currentStockPage}>
              <Pager.Page name="arrival">
                <Stock.Arrival />
              </Pager.Page>

              <Pager.Page name="release">
                <Stock.Released />
              </Pager.Page>

              <Pager.Page name="finish">
                <Stock.Finish />
              </Pager.Page>
            </Pager>
          </Ribbon.Content>

          <Ribbon.Content name="representatives">
            <Representatives currentPage={currentRepresentativePage} />
          </Ribbon.Content>

          <Ribbon.Content name="purchaseResume">
            <Pager currentPage={currentPurchaseResumePage}>
              <Pager.Page name="fromProvider">
                <PurchaseResume.FromProvider />
              </Pager.Page>

              <Pager.Page name="fromEvolution">
                <PurchaseResume.FromEvolution />
              </Pager.Page>

              <Pager.Page name="fromState">
                <PurchaseResume.FromState />
              </Pager.Page>

              <Pager.Page name="fromBuyer">
                <PurchaseResume.FromBuyer />
              </Pager.Page>
            </Pager>
          </Ribbon.Content>

          <Ribbon.Content name="revenues">
            <Revenues currentPage={currentRevenuesPage} />
          </Ribbon.Content>

          <Ribbon.Content name="stockPosition">
            <Pager currentPage={currentStockPositionPage}>
              <Pager.Page name="general">
                <StockPosition.General />
              </Pager.Page>

              <Pager.Page name="syntheticMovement">
                <StockPosition.SyntheticMovement />
              </Pager.Page>

              <Pager.Page name="master">
                <StockPosition.Master />
              </Pager.Page>

              <Pager.Page name="comparative">
                <StockPosition.Comparative />
              </Pager.Page>
            </Pager>
          </Ribbon.Content>

          <Ribbon.Content name="salesByProvider">
            <SalesByProvider currentPage={currentSalesByProviderPage} />
          </Ribbon.Content>
        </Ribbon.Container>
      </Ribbon>
    </StoreContextProvider>
  )
}

export default Home
