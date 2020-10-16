import React, { useState, useCallback, useEffect } from 'react'

import { Checkbox, Button } from '@shared/web-components'

import { Container } from './styles'
import { FilterSituationsProps } from './types'

const FilterSituations: React.VFC<FilterSituationsProps> = ({ onChange }) => {
  const [nonSended, setNonSended] = useState(true)
  const [nonRevised, setNonRevised] = useState(true)
  const [nonReleased, setNonReleased] = useState(true)
  const [nonExpectedBilling, setNonExpectedBilling] = useState(true)
  const [nonBilled, setNonBilled] = useState(true)
  const [nonFreeOnBoard, setNonFreeOnBoard] = useState(true)
  const [nonScheduling, setNonScheduling] = useState(true)
  const [nonScheduled, setNonScheduled] = useState(true)

  const handleSelectAll = useCallback(() => {
    setNonSended(true)
    setNonRevised(true)
    setNonReleased(true)
    setNonExpectedBilling(true)
    setNonBilled(true)
    setNonFreeOnBoard(true)
    setNonScheduling(true)
    setNonScheduled(true)
  }, [])

  const handleInvert = useCallback(() => {
    setNonSended(old => !old)
    setNonRevised(old => !old)
    setNonReleased(old => !old)
    setNonExpectedBilling(old => !old)
    setNonBilled(old => !old)
    setNonFreeOnBoard(old => !old)
    setNonScheduling(old => !old)
    setNonScheduled(old => !old)
  }, [])

  useEffect(() => {
    onChange({
      nonSended,
      nonRevised,
      nonReleased,
      nonExpectedBilling,
      nonBilled,
      nonFreeOnBoard,
      nonScheduling,
      nonScheduled
    })
  }, [
    onChange,
    nonSended,
    nonRevised,
    nonReleased,
    nonExpectedBilling,
    nonBilled,
    nonFreeOnBoard,
    nonScheduling,
    nonScheduled
  ])

  return (
    <Container>
      <h2>Filtrar Timeline</h2>

      <Checkbox
        label="Sem Envio"
        value={nonSended}
        onValueChange={setNonSended}
      />

      <Checkbox
        label="Sem Revisão"
        value={nonRevised}
        onValueChange={setNonRevised}
      />

      <Checkbox
        label="Sem Liberação"
        value={nonReleased}
        onValueChange={setNonReleased}
      />

      <Checkbox
        label="Sem Previsão de Faturamento"
        value={nonExpectedBilling}
        onValueChange={setNonExpectedBilling}
      />

      <Checkbox
        label="Sem Faturamento"
        value={nonBilled}
        onValueChange={setNonBilled}
      />

      <Checkbox
        label="Sem Agendamento FOB"
        value={nonFreeOnBoard}
        onValueChange={setNonFreeOnBoard}
      />

      <Checkbox
        label="Sem Previsão de Agendamento"
        value={nonScheduling}
        onValueChange={setNonScheduling}
      />

      <Checkbox
        label="Sem Agendamento"
        value={nonScheduled}
        onValueChange={setNonScheduled}
      />

      <Button label="Selecionar Todos" secondary onClick={handleSelectAll} />
      <Button label="Inverter Seleção" secondary onClick={handleInvert} />
    </Container>
  )
}

export default FilterSituations
