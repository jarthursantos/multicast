import React, { useEffect, useState } from 'react'
import { MdAccountCircle, MdNewReleases, MdDashboard } from 'react-icons/md'

import Head from 'next/head'

import { ButtonGroup } from '@shared/web-components/Button'
import { Pager } from '@shared/web-components/Pager'
import { Ribbon, TabBar, TabOptions } from '@shared/web-components/Ribbon'

import { MdPendingAction } from '../components/icons/PendingAction'
import { MdReceiptLong } from '../components/icons/ReceiptLong'

const Home = () => {
  const [group, setGroup] = useState<string>()

  useEffect(() => console.log(group), [group])

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Pedidos</title>
      </Head>

      <Ribbon>
        <Ribbon.Bar initialTab="accompaniments">
          <TabBar.Button name="accompaniments" label="Pedidos" />

          <TabBar.Button name="representatives" label="Representantes" />
        </Ribbon.Bar>

        <Ribbon.Options>
          <TabOptions.Content name="accompaniments">
            <ButtonGroup initialButton="resume" onSelectionChange={setGroup}>
              <ButtonGroup.Button
                name="resume"
                label="Resumo Geral"
                icon={<MdDashboard />}
                width={90}
              />
              <ButtonGroup.Button
                name="new"
                label="Novos Pedidos"
                icon={<MdNewReleases />}
                width={90}
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

          <TabOptions.Content name="representatives">
            <ButtonGroup initialButton="resume">
              <ButtonGroup.Button
                name="resume"
                label="Tabela Geral"
                icon={<MdAccountCircle />}
                width={90}
              />
              <ButtonGroup.Button
                name="inProgress"
                label="Por Representante"
                icon={<MdAccountCircle />}
                width={110}
              />
              <ButtonGroup.Button
                name="inReceivement"
                label="Por Comprador"
                icon={<MdAccountCircle />}
                width={90}
              />
            </ButtonGroup>
          </TabOptions.Content>
        </Ribbon.Options>

        <Ribbon.Container>
          <Ribbon.Content name="accompaniments">
            <Pager currentPage={group}>
              <Pager.Page name="resume">
                <h2>Dashboard</h2>
              </Pager.Page>

              <Pager.Page name="new">
                <h2>Novos</h2>
              </Pager.Page>

              <Pager.Page name="inProgress">
                <h2>Em Andamento</h2>
              </Pager.Page>

              <Pager.Page name="inReceivement">
                <h2>Em Recebimento</h2>
              </Pager.Page>
            </Pager>
          </Ribbon.Content>

          <Ribbon.Content name="representatives">
            <h2>Representantes</h2>
          </Ribbon.Content>
        </Ribbon.Container>
      </Ribbon>
    </React.Fragment>
  )
}

export default Home
