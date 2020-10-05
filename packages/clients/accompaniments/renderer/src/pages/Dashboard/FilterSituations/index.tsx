import React, { useState, useCallback } from 'react'

import { Checkbox, Button } from '@shared/web-components'

import { Container } from './styles'

const FilterSituations: React.FC = () => {
  const [nonRevised, setNonRevised] = useState(true)
  const [nonReleased, setNonReleased] = useState(true)
  const [nonExpectedBilling, setNonExpectedBilling] = useState(true)
  const [nonBilled, setNonBilled] = useState(true)
  const [nonFreeOnBoard, setNonFreeOnBoard] = useState(true)
  const [nonScheduling, setNonScheduling] = useState(true)
  const [nonScheduled, setNonScheduled] = useState(true)

  const handleSelectAll = useCallback(() => {
    setNonRevised(true)
    setNonReleased(true)
    setNonExpectedBilling(true)
    setNonBilled(true)
    setNonFreeOnBoard(true)
    setNonScheduling(true)
    setNonScheduled(true)
  }, [])

  const handleInvert = useCallback(() => {
    setNonRevised(old => !old)
    setNonReleased(old => !old)
    setNonExpectedBilling(old => !old)
    setNonBilled(old => !old)
    setNonFreeOnBoard(old => !old)
    setNonScheduling(old => !old)
    setNonScheduled(old => !old)
  }, [])

  return (
    <Container>
      <h2>Filtrar Timeline</h2>

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
