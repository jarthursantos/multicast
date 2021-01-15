import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { useWatchAction } from '@shared/action-watcher'
import {
  Button,
  SubmitButton,
  NumberInput,
  ProviderInput,
  BuyerInput,
  DateInput
} from '@shared/web-components'

import {
  applyAccompanimentsFilters,
  clearAccompanimentsFilters
} from '~/store/modules/accompaniments/actions'
import {
  IAccompanimentFilters,
  Types
} from '~/store/modules/accompaniments/types'
import { closeWindow } from '~/utils/close-window'

import { Wrapper, Container, Inline, ActionsWrapper } from './styles'
import { IAccompanimentsFilterScreenProps } from './types'

const AccompanimentsFilterScreen: React.VFC<IAccompanimentsFilterScreenProps> = ({
  filters
}) => {
  const dispatch = useDispatch()

  const handleSubmit = useCallback(
    (data: IAccompanimentFilters) => dispatch(applyAccompanimentsFilters(data)),
    [dispatch]
  )

  const handleClearFilters = useCallback(
    () => dispatch(clearAccompanimentsFilters()),
    [dispatch]
  )

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
      </Container>

      <ActionsWrapper>
        <Button onClick={handleClearFilters} label="Limpar Filtros" secondary />

        <SubmitButton label="Filtrar" />
      </ActionsWrapper>
    </Wrapper>
  )
}

export { AccompanimentsFilterScreen }
