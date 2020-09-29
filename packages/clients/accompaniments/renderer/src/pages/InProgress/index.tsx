import React, { useState } from 'react'
import {
  MdApps,
  MdLocalShipping,
  MdLockOpen,
  MdReceipt,
  MdToday,
  MdVisibility,
  MdVisibilityOff
} from 'react-icons/md'

import { DataGrid, Pager } from '@shared/web-components'

import { MdPendingAction } from '~/components/Icons/PendingAction'
import ProductsContainer from '~/components/ProductsContainer'
import SituationGroup from '~/components/SituationGroup'

import {
  allAccompanimentsColumns,
  nonRevisedColumns,
  revisedColumns,
  unlockedColumns,
  estimatedBillingColumns,
  billedColumns,
  fobColumns,
  schedulingForecastColumns
} from './columns'
import { Wrapper, Header, Container, ProductsWrapper } from './styles'

interface Accompaniment {
  number: number
  provider: string
}

const InProgress: React.FC = () => {
  const [currentSituation, setCurrentSituation] = useState<string>()

  return (
    <Wrapper>
      <Header>
        <SituationGroup
          initialGroup="allAccompaniments"
          onGroupChange={setCurrentSituation}
        >
          <SituationGroup.Button
            name="allAccompaniments"
            label="Todos"
            icon={<MdApps />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="nonRevised"
            label="Não Revisados"
            icon={<MdVisibilityOff />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="revised"
            label="Revisados"
            icon={<MdVisibility />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="unlocked"
            label="Liberados"
            icon={<MdLockOpen />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="estimatedBilling"
            label="Prev. Faturamento"
            icon={<MdPendingAction />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="billed"
            label="Faturados"
            icon={<MdReceipt />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="fob"
            label="FOB"
            icon={<MdLocalShipping />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="schedulingForecast"
            label="Prev. Agendamento"
            icon={<MdToday />}
            delayCount={1}
            accompanimentCount={10}
          />
        </SituationGroup>
      </Header>

      <Container>
        <Pager currentPage={currentSituation}>
          <Pager.Page name="allAccompaniments">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={allAccompanimentsColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="nonRevised">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={nonRevisedColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="revised">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={revisedColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="unlocked">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={unlockedColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="estimatedBilling">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={estimatedBillingColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="billed">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={billedColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="fob">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={fobColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="schedulingForecast">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={schedulingForecastColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>
        </Pager>
      </Container>

      <ProductsWrapper>
        <ProductsContainer />
      </ProductsWrapper>
    </Wrapper>
  )
}

export default InProgress
