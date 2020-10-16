import React, { useCallback, useState } from 'react'
import {
  MdEventAvailable,
  MdLockOpen,
  MdAssignmentTurnedIn,
  MdSystemUpdateAlt,
  MdEventBusy
} from 'react-icons/md'

import { DataGrid, Pager } from '@shared/web-components'

import ProductsContainer from '~/components/ProductsContainer'
import SituationGroup from '~/components/SituationGroup'
import { Accompaniment } from '~/store/modules/accompaniments/types'

import {
  useNonScheduledData,
  useScheduledData,
  useReceivingData,
  useDownloadedData,
  useUnlockedData
} from './columns'
import { Wrapper, Header, Container, ProductsWrapper } from './styles'

const Receiving: React.FC = () => {
  const [currentSituation, setCurrentSituation] = useState<string>()

  const [
    nonScheduledAccompaniments,
    nonScheduledAccompanimentsColumns,
    nonScheduledAccompanimentsCount,
    nonScheduledAccompanimentsDelayed
  ] = useNonScheduledData()

  const [
    scheduledAccompaniments,
    scheduledAccompanimentsColumns,
    scheduledAccompanimentsCount,
    scheduledAccompanimentsDelayed
  ] = useScheduledData()

  const [
    receivingAccompaniments,
    receivingAccompanimentsColumns,
    receivingAccompanimentsCount,
    receivingAccompanimentsDelayed
  ] = useReceivingData()

  const [
    downloadedAccompaniments,
    downloadedAccompanimentsColumns,
    downloadedAccompanimentsCount,
    downloadedAccompanimentsDelayed
  ] = useDownloadedData()

  const [
    unlockedAccompaniments,
    unlockedAccompanimentsColumns,
    unlockedAccompanimentsCount,
    unlockedAccompanimentsDelayed
  ] = useUnlockedData()

  const handleResolveRowStyle = useCallback(
    (accompaniment: Accompaniment): React.CSSProperties => {
      const { isBonification } = accompaniment.purchaseOrder
      const { isOutstanding: isOutstandingBalance } = accompaniment

      return {
        ...(isBonification ? { color: 'blue' } : {}),
        ...(isOutstandingBalance ? { fontWeight: 500 } : {})
      }
    },
    []
  )

  return (
    <Wrapper>
      <Header>
        <SituationGroup
          initialGroup="nonScheduled"
          onGroupChange={setCurrentSituation}
        >
          <SituationGroup.Button
            name="nonScheduled"
            label="Não Agendados"
            icon={<MdEventBusy />}
            delayCount={nonScheduledAccompanimentsDelayed}
            accompanimentCount={nonScheduledAccompanimentsCount}
          />

          <SituationGroup.Button
            name="scheduled"
            label="Agendados"
            icon={<MdEventAvailable />}
            delayCount={scheduledAccompanimentsDelayed}
            accompanimentCount={scheduledAccompanimentsCount}
          />

          <SituationGroup.Button
            name="received"
            label="Recebidos"
            icon={<MdAssignmentTurnedIn />}
            delayCount={receivingAccompanimentsDelayed}
            accompanimentCount={receivingAccompanimentsCount}
          />

          <SituationGroup.Button
            name="downloaded"
            label="Descarregados"
            icon={<MdSystemUpdateAlt />}
            delayCount={downloadedAccompanimentsDelayed}
            accompanimentCount={downloadedAccompanimentsCount}
          />

          <SituationGroup.Button
            name="unlocked"
            label="Desbloqueados"
            icon={<MdLockOpen />}
            delayCount={unlockedAccompanimentsDelayed}
            accompanimentCount={unlockedAccompanimentsCount}
          />
        </SituationGroup>
      </Header>

      <Container>
        <Pager currentPage={currentSituation}>
          <Pager.Page name="nonScheduled">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={nonScheduledAccompanimentsColumns}
              data={nonScheduledAccompaniments}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="scheduled">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={scheduledAccompanimentsColumns}
              data={scheduledAccompaniments}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="received">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={receivingAccompanimentsColumns}
              data={receivingAccompaniments}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="downloaded">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={downloadedAccompanimentsColumns}
              data={downloadedAccompaniments}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="unlocked">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={unlockedAccompanimentsColumns}
              data={unlockedAccompaniments}
              resolveRowStyle={handleResolveRowStyle}
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
