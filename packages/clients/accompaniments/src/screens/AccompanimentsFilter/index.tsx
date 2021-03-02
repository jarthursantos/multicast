import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useWatchAction } from '@shared/action-watcher'
import {
  Button,
  SubmitButton,
  NumberInput,
  ProviderInput,
  Checkbox,
  BuyerInput,
  DateInput
} from '@shared/web-components'

import {
  applyAccompanimentsFilters,
  clearAccompanimentsFilters,
  includeCanceledAccompaniments,
  clearCanceledAccompaniments,
  includeCompletedAccompaniments,
  clearCompletedAccompaniments
} from '~/store/modules/accompaniments/actions'
import {
  IAccompanimentFilters,
  Types
} from '~/store/modules/accompaniments/types'
import { closeWindow } from '~/utils/close-window'

import { Wrapper, Container, Inline, ActionsWrapper } from './styles'
import { IAccompanimentsFilterScreenProps } from './types'

const AccompanimentsFilterScreen: React.VFC<IAccompanimentsFilterScreenProps> = ({
  filters,
  includeCanceledAccompaniments: canceledAccompaniments,
  includeCompletedAccompaniments: completedAccompaniments
}) => {
  const dispatch = useDispatch()

  const [generateCanceledReport, setGenerateCanceledReport] = useState(
    canceledAccompaniments
  )
  const [generateFinishedReport, setGenerateFinishedReport] = useState(
    completedAccompaniments
  )

  const handleSubmit = useCallback(
    (data: IAccompanimentFilters) => {
      dispatch(applyAccompanimentsFilters(data))

      dispatch(
        generateCanceledReport
          ? includeCanceledAccompaniments(data)
          : clearCanceledAccompaniments()
      )

      dispatch(
        generateFinishedReport
          ? includeCompletedAccompaniments(data)
          : clearCompletedAccompaniments()
      )
    },
    [dispatch, generateCanceledReport, generateFinishedReport]
  )

  const handleClearFilters = useCallback(
    () => dispatch(clearAccompanimentsFilters()),
    [dispatch]
  )

  useEffect(() => {
    setGenerateCanceledReport(canceledAccompaniments)
  }, [canceledAccompaniments])

  useEffect(() => {
    setGenerateFinishedReport(completedAccompaniments)
  }, [completedAccompaniments])

  useWatchAction(closeWindow, [
    Types.APPLY_ACCOMPANIMENTS_FILTERS,
    Types.CLEAR_ACCOMPANIMENTS_FILTERS
  ])

  return (
    <Wrapper onSubmit={handleSubmit} initialData={filters} noValidate>
      <Container>
        <BuyerInput name="buyers" label="Compradores" />

        <ProviderInput name="providers" label="Fornecedor" />

        <h3>Número do Pedido</h3>

        <Inline>
          <NumberInput name="numberFrom" label="De" />
          <NumberInput name="numberTo" label="Até" />
        </Inline>

        <h3>Emissão do Pedido</h3>

        <Inline>
          <DateInput name="periodFrom" label="De" position="top" />
          <DateInput name="periodTo" label="Até" position="top" />
        </Inline>

        <h3>Relatórios</h3>

        <Checkbox
          label="Buscar Pedidos Cancelados"
          value={generateCanceledReport}
          onValueChange={setGenerateCanceledReport}
        />

        <Checkbox
          label="Buscar Pedidos Finalizados"
          value={generateFinishedReport}
          onValueChange={setGenerateFinishedReport}
        />
      </Container>

      <ActionsWrapper>
        <Button onClick={handleClearFilters} label="Limpar Filtros" secondary />

        <SubmitButton label="Filtrar" />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { AccompanimentsFilterScreen }
