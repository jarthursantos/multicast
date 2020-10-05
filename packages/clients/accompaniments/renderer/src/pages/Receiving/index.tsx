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
  useScheduledAccompaniments,
  useReceivingAccompaniments,
  useDownloadedAccompaniments,
  useUnlockedAccompaniments
} from '~/store/context'
import { Accompaniment } from '~/store/modules/accompaniments/types'

import {
  scheduledColumns,
  receivingColumns,
  downloadedColumns,
  unlockedColumns
} from './columns'
import { Wrapper, Header, Container, ProductsWrapper } from './styles'

const Receiving: React.FC = () => {
  const [currentSituation, setCurrentSituation] = useState<string>()

  const scheduledAccompaniments = useScheduledAccompaniments()
  const receivingAccompaniments = useReceivingAccompaniments()
  const downloadedAccompaniments = useDownloadedAccompaniments()
  const unlockedAccompaniments = useUnlockedAccompaniments()

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
              keyBinding="id"
              columns={scheduledColumns}
              data={scheduledAccompaniments}
            />
          </Pager.Page>

          <Pager.Page name="received">
            <DataGrid<Accompaniment>
              keyBinding="id"
              columns={receivingColumns}
              data={receivingAccompaniments}
            />
          </Pager.Page>

          <Pager.Page name="downloaded">
            <DataGrid<Accompaniment>
              keyBinding="id"
              columns={downloadedColumns}
              data={downloadedAccompaniments}
            />
          </Pager.Page>

          <Pager.Page name="unlocked">
            <DataGrid<Accompaniment>
              keyBinding="id"
              columns={unlockedColumns}
              data={unlockedAccompaniments}
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
