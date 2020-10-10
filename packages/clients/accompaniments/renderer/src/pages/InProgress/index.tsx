import React, { useCallback, useState } from 'react'
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
import { useOpenWindow } from '~/hooks/use-open-window'
import { Accompaniment } from '~/store/modules/accompaniments/types'

import {
  useNonRevisedData,
  useRevisedData,
  useReleasedData,
  useExpectedBillingData,
  useBilledData,
  useFreeOnBoardData,
  useSchedulingData,
  useAllAccompanimentsData
} from './columns'
import { Wrapper, Header, Container, ProductsWrapper } from './styles'

const InProgress: React.FC = () => {
  const [currentSituation, setCurrentSituation] = useState<string>()

  const [
    allAccompaniments,
    allAccompanimentsColumns,
    allAccompanimentsCount,
    allAccompanimentsDelayed
  ] = useAllAccompanimentsData()

  const [
    nonRevisedAccompaniments,
    nonRevisedColumns,
    nonRevisedCount,
    nonRevisedDelayed
  ] = useNonRevisedData()

  const [
    revisedAccompaniments,
    revisedColumns,
    revisedCount,
    revisedDelayed
  ] = useRevisedData()

  const [
    releasedAccompaniments,
    releasedColumns,
    releasedCount,
    releasedDelayed
  ] = useReleasedData()

  const [
    expectedBillingAccompaniments,
    expectedBillingColumns,
    expectedBillingCount,
    expectedBillingDelayed
  ] = useExpectedBillingData()

  const [
    billedAccompaniments,
    billedColumns,
    billedCount,
    billedDelayed
  ] = useBilledData()

  const [
    freeOnBoardAccompaniments,
    freeOnBoardColumns,
    freeOnBoardCount,
    freeOnBoardDelayed
  ] = useFreeOnBoardData()

  const [
    schedulingAccompaniments,
    schedulingColumns,
    schedulingCount,
    schedulingDelayed
  ] = useSchedulingData()

  const handleOpenAccompaniment = useOpenWindow('Accompaniment')

  const handleDoubleClickRow = useCallback(
    (item: Accompaniment) => handleOpenAccompaniment(item.id),
    [handleOpenAccompaniment]
  )

  const handleResolveRowStyle = useCallback(
    (accompaniment: Accompaniment): React.CSSProperties => {
      const { isBonification } = accompaniment.purchaseOrder
      const { isOutstandingBalance } = accompaniment

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
          initialGroup="allAccompaniments"
          onGroupChange={setCurrentSituation}
        >
          <SituationGroup.Button
            name="allAccompaniments"
            label="Todos"
            icon={<MdApps />}
            delayCount={allAccompanimentsDelayed}
            accompanimentCount={allAccompanimentsCount}
          />
          <SituationGroup.Button
            name="nonRevised"
            label="A Enviar"
            icon={<MdVisibilityOff />}
            delayCount={nonRevisedDelayed}
            accompanimentCount={nonRevisedCount}
          />
          <SituationGroup.Button
            name="revised"
            label="A Revisar"
            icon={<MdVisibility />}
            delayCount={revisedDelayed}
            accompanimentCount={revisedCount}
          />
          <SituationGroup.Button
            name="released"
            label="A Liberar"
            icon={<MdLockOpen />}
            delayCount={releasedDelayed}
            accompanimentCount={releasedCount}
          />
          <SituationGroup.Button
            name="expectedBilling"
            label="A Prever Faturamento"
            icon={<MdPendingAction />}
            delayCount={expectedBillingDelayed}
            accompanimentCount={expectedBillingCount}
          />
          <SituationGroup.Button
            name="billed"
            label="A Faturar"
            icon={<MdReceipt />}
            delayCount={billedDelayed}
            accompanimentCount={billedCount}
          />
          <SituationGroup.Button
            name="freeOnBoard"
            label="A Agendar FOB"
            icon={<MdLocalShipping />}
            delayCount={freeOnBoardDelayed}
            accompanimentCount={freeOnBoardCount}
          />
          <SituationGroup.Button
            name="scheduling"
            label="A Prever Agendamento"
            icon={<MdToday />}
            delayCount={schedulingDelayed}
            accompanimentCount={schedulingCount}
          />
        </SituationGroup>
      </Header>

      <Container>
        <Pager currentPage={currentSituation}>
          <Pager.Page name="allAccompaniments">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              data={allAccompaniments}
              columns={allAccompanimentsColumns}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="nonRevised">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={nonRevisedColumns}
              data={nonRevisedAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="revised">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={revisedColumns}
              data={revisedAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="released">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={releasedColumns}
              data={releasedAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="expectedBilling">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={expectedBillingColumns}
              data={expectedBillingAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="billed">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={billedColumns}
              data={billedAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="freeOnBoard">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={freeOnBoardColumns}
              data={freeOnBoardAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
            />
          </Pager.Page>

          <Pager.Page name="scheduling">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={schedulingColumns}
              data={schedulingAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
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

export default InProgress
