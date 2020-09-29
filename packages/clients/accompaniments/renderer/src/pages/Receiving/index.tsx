import React, { useState } from 'react'
import {
  MdEventAvailable,
  MdLockOpen,
  MdAssignmentTurnedIn,
  MdSystemUpdateAlt
} from 'react-icons/md'

import { DataGrid, Pager } from '@shared/web-components'

import ProductsContainer from '~/components/ProductsContainer'
import SituationGroup from '~/components/SituationGroup'

import {
  allAccompanimentsColumns,
  nonRevisedColumns,
  revisedColumns,
  unlockedColumns
} from './columns'
import { Wrapper, Header, Container, ProductsWrapper } from './styles'

interface Accompaniment {
  number: number
  provider: string
}

const Receiving: React.FC = () => {
  const [currentSituation, setCurrentSituation] = useState<string>()

  return (
    <Wrapper>
      <Header>
        <SituationGroup
          initialGroup="scheduled"
          onGroupChange={setCurrentSituation}
        >
          <SituationGroup.Button
            name="scheduled"
            label="Agendados"
            icon={<MdEventAvailable />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="received"
            label="Recebidos"
            icon={<MdAssignmentTurnedIn />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="downloaded"
            label="Descarregados"
            icon={<MdSystemUpdateAlt />}
            delayCount={1}
            accompanimentCount={10}
          />
          <SituationGroup.Button
            name="unlocked"
            label="Desbloqueados"
            icon={<MdLockOpen />}
            delayCount={1}
            accompanimentCount={10}
          />
        </SituationGroup>
      </Header>

      <Container>
        <Pager currentPage={currentSituation}>
          <Pager.Page name="scheduled">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={allAccompanimentsColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="received">
            <DataGrid<Accompaniment>
              keyBinding="number"
              columns={nonRevisedColumns}
              data={[{ number: 1, provider: '1' }]}
            />
          </Pager.Page>

          <Pager.Page name="downloaded">
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
        </Pager>
      </Container>

      <ProductsWrapper>
        <ProductsContainer />
      </ProductsWrapper>
    </Wrapper>
  )
}

export default Receiving
