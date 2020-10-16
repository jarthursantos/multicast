import React, { useCallback, useMemo, useState } from 'react'
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

  const [allSelection, setAllSelection] = useState<Accompaniment>()

  const [
    nonRevisedAccompaniments,
    nonRevisedColumns,
    nonRevisedCount,
    nonRevisedDelayed
  ] = useNonRevisedData()

  const [nonRevisedSelection, setNonRevisedSelection] = useState<
    Accompaniment
  >()

  const [
    revisedAccompaniments,
    revisedColumns,
    revisedCount,
    revisedDelayed
  ] = useRevisedData()

  const [revisedSelection, setRevisedSelection] = useState<Accompaniment>()

  const [
    releasedAccompaniments,
    releasedColumns,
    releasedCount,
    releasedDelayed
  ] = useReleasedData()

  const [releasedSelection, setReleasedSelection] = useState<Accompaniment>()

  const [
    expectedBillingAccompaniments,
    expectedBillingColumns,
    expectedBillingCount,
    expectedBillingDelayed
  ] = useExpectedBillingData()

  const [expectedBillingSelection, setExpectedBillingSelection] = useState<
    Accompaniment
  >()

  const [
    billedAccompaniments,
    billedColumns,
    billedCount,
    billedDelayed
  ] = useBilledData()

  const [billedSelection, setBilledSelection] = useState<Accompaniment>()

  const [
    freeOnBoardAccompaniments,
    freeOnBoardColumns,
    freeOnBoardCount,
    freeOnBoardDelayed
  ] = useFreeOnBoardData()

  const [freeOnBoardSelection, setFreeOnBoardSelection] = useState<
    Accompaniment
  >()

  const [
    schedulingAccompaniments,
    schedulingColumns,
    schedulingCount,
    schedulingDelayed
  ] = useSchedulingData()

  const [schedulingSelection, setSchedulingSelection] = useState<
    Accompaniment
  >()

  const handleOpenAccompaniment = useOpenWindow('Accompaniment')

  const handleDoubleClickRow = useCallback(
    (item: Accompaniment) => handleOpenAccompaniment(item.id),
    [handleOpenAccompaniment]
  )

  const handleResolveRowStyle = useCallback(
    (accompaniment: Accompaniment): React.CSSProperties => {
      const { isBonification } = accompaniment.purchaseOrder
      const { isOutstanding: isOutstandingBalance } = accompaniment

      return {
        ...(isBonification ? { color: 'blue' } : {}),
        ...(isOutstandingBalance ? { fontWeight: 'bold' } : {})
      }
    },
    []
  )

  const accompanimentId = useMemo(() => {
    let accompanimentId: string

    switch (currentSituation) {
      case 'allAccompaniments':
        if (!allSelection) return

        accompanimentId = allSelection.id
        break
      case 'nonRevised':
        if (!nonRevisedSelection) return

        accompanimentId = nonRevisedSelection.id
        break
      case 'revised':
        if (!revisedSelection) return

        accompanimentId = revisedSelection.id
        break
      case 'released':
        if (!releasedSelection) return

        accompanimentId = releasedSelection.id
        break
      case 'expectedBilling':
        if (!expectedBillingSelection) return

        accompanimentId = expectedBillingSelection.id
        break
      case 'billed':
        if (!billedSelection) return

        accompanimentId = billedSelection.id
        break
      case 'freeOnBoard':
        if (!freeOnBoardSelection) return

        accompanimentId = freeOnBoardSelection.id
        break
      case 'scheduling':
        if (!schedulingSelection) return

        accompanimentId = schedulingSelection.id
        break
    }

    return accompanimentId
  }, [
    currentSituation,
    allSelection,
    nonRevisedSelection,
    revisedSelection,
    releasedSelection,
    expectedBillingSelection,
    billedSelection,
    freeOnBoardSelection,
    schedulingSelection
  ]) // filter selection

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
              onSelectionChange={setAllSelection}
            />
          </Pager.Page>

          <Pager.Page name="nonRevised">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={nonRevisedColumns}
              data={nonRevisedAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
              onSelectionChange={setNonRevisedSelection}
            />
          </Pager.Page>

          <Pager.Page name="revised">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={revisedColumns}
              data={revisedAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
              onSelectionChange={setRevisedSelection}
            />
          </Pager.Page>

          <Pager.Page name="released">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={releasedColumns}
              data={releasedAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
              onSelectionChange={setReleasedSelection}
            />
          </Pager.Page>

          <Pager.Page name="expectedBilling">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={expectedBillingColumns}
              data={expectedBillingAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
              onSelectionChange={setExpectedBillingSelection}
            />
          </Pager.Page>

          <Pager.Page name="billed">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={billedColumns}
              data={billedAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
              onSelectionChange={setBilledSelection}
            />
          </Pager.Page>

          <Pager.Page name="freeOnBoard">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={freeOnBoardColumns}
              data={freeOnBoardAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
              onSelectionChange={setFreeOnBoardSelection}
            />
          </Pager.Page>

          <Pager.Page name="scheduling">
            <DataGrid<Accompaniment>
              keyExtractor={accompaniment => accompaniment.id}
              columns={schedulingColumns}
              data={schedulingAccompaniments}
              onRowDoubleClick={handleDoubleClickRow}
              resolveRowStyle={handleResolveRowStyle}
              onSelectionChange={setSchedulingSelection}
            />
          </Pager.Page>
        </Pager>
      </Container>

      <ProductsWrapper>
        <ProductsContainer accompanimentId={accompanimentId} />
      </ProductsWrapper>
    </Wrapper>
  )
}

export default InProgress
