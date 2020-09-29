import React, { useState } from 'react'
import { MdNewReleases, MdDashboard } from 'react-icons/md'

import Head from 'next/head'

import { ButtonGroup } from '@shared/web-components/Button'
import { Pager } from '@shared/web-components/Pager'
import { Ribbon, TabBar, TabOptions } from '@shared/web-components/Ribbon'

import { MdPendingAction } from '../components/Icons/PendingAction'
import { MdReceiptLong } from '../components/Icons/ReceiptLong'
import Dashboard from './subpages/Dashboard'
import InProgress from './subpages/InProgress'
import News from './subpages/News'
import Receiving from './subpages/Receiving'

const Home = () => {
  const [currentPage, setPage] = useState<string>()

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Pedidos</title>
      </Head>

      <Ribbon>
        <Ribbon.Bar initialTab="accompaniments">
          <TabBar.Button name="accompaniments" label="Pedidos" />
        </Ribbon.Bar>

        <Ribbon.Options>
          <TabOptions.Content name="accompaniments">
            <ButtonGroup initialButton="inProgress" onSelectionChange={setPage}>
              <ButtonGroup.Button
                name="resume"
                label="Resumo Geral"
                icon={<MdDashboard />}
                width={85}
              />
              <ButtonGroup.Button
                name="new"
                label="Novos Pedidos"
                icon={<MdNewReleases />}
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
          </TabOptions.Content>
        </Ribbon.Options>

        <Ribbon.Container>
          <Ribbon.Content name="accompaniments">
            <Pager currentPage={currentPage}>
              <Pager.Page name="resume">
                <Dashboard />
              </Pager.Page>

              <Pager.Page name="new">
                <News />
              </Pager.Page>

              <Pager.Page name="inProgress">
                <InProgress />
              </Pager.Page>

              <Pager.Page name="inReceivement">
                <Receiving />
              </Pager.Page>
            </Pager>
          </Ribbon.Content>
        </Ribbon.Container>
      </Ribbon>
    </React.Fragment>
  )
}

export default Home
