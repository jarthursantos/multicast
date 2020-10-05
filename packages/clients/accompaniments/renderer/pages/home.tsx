import React, { useCallback, useState } from 'react'
import { MdDashboard, MdRefresh } from 'react-icons/md'
import LoadingIndicator from 'react-loading'
import { useDispatch } from 'react-redux'

import Head from 'next/head'

import { ActionIconButton, ButtonGroup } from '@shared/web-components/Button'
import { Pager } from '@shared/web-components/Pager'
import { Ribbon, TabBar, TabOptions } from '@shared/web-components/Ribbon'

import Backdrop from '~/components/Backdrop'
import { MdFilter } from '~/components/Icons/Filter'
import { MdPendingAction } from '~/components/Icons/PendingAction'
import { MdReceiptLong } from '~/components/Icons/ReceiptLong'
import Dashboard from '~/pages/Dashboard'
import InProgress from '~/pages/InProgress'
import Receiving from '~/pages/Receiving'
import { useTypedSelector } from '~/store'
import { StoreContextProvider } from '~/store/context'
import { loadAccompanimentsRequestAction } from '~/store/modules/accompaniments/actions'

const Home = () => {
  const dispatch = useDispatch()

  const { loading } = useTypedSelector(state => state.accompaniments)

  const [currentPage, setPage] = useState<string>()

  const handleRefresh = useCallback(() => {
    dispatch(loadAccompanimentsRequestAction())
  }, [dispatch])

  return (
    <StoreContextProvider>
      <Head>
        <title>FollowUP Compras - Pedidos</title>
      </Head>

      <Ribbon>
        <Ribbon.Bar initialTab="accompaniments">
          <TabBar.Button name="accompaniments" label="Pedidos" />
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
              label="Filtrar Pedidos"
            />

            <ActionIconButton
              icon={<MdRefresh />}
              onClick={handleRefresh}
              width={80}
              label="Atualizar Pedidos"
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
        </Ribbon.Container>
      </Ribbon>
    </StoreContextProvider>
  )
}

export default Home
