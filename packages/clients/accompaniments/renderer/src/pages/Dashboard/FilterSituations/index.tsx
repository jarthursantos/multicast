import React, { useState, useCallback } from 'react'

import { Checkbox, Button } from '@shared/web-components'

import { Container } from './styles'

const FilterSituations: React.FC = () => {
  const [nonRevised, setNonRevised] = useState(true)
  const [nonUnlocked, setNonUnlocked] = useState(true)
  const [nonEstimatedBilling, setNonEstimatedBilling] = useState(true)
  const [nonBilled, setNonBilled] = useState(true)
  const [nonFOB, setNonFOB] = useState(true)
  const [nonEstimatedSchedule, setNonEstimatedSchedule] = useState(true)
  const [nonScheduled, setNonScheduled] = useState(true)

  const handleSelectAll = useCallback(() => {
    setNonRevised(true)
    setNonUnlocked(true)
    setNonEstimatedBilling(true)
    setNonBilled(true)
    setNonFOB(true)
    setNonEstimatedSchedule(true)
    setNonScheduled(true)
  }, [])

  const handleInvert = useCallback(() => {
    setNonRevised(old => !old)
    setNonUnlocked(old => !old)
    setNonEstimatedBilling(old => !old)
    setNonBilled(old => !old)
    setNonFOB(old => !old)
    setNonEstimatedSchedule(old => !old)
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
        value={nonUnlocked}
        onValueChange={setNonUnlocked}
      />

      <Checkbox
        label="Sem Previsão de Faturamento"
        value={nonEstimatedBilling}
        onValueChange={setNonEstimatedBilling}
      />

      <Checkbox
        label="Sem Faturamento"
        value={nonBilled}
        onValueChange={setNonBilled}
      />

      <Checkbox
        label="Sem Agendamento FOB"
        value={nonFOB}
        onValueChange={setNonFOB}
      />

      <Checkbox
        label="Sem Previsão de Agendamento"
        value={nonEstimatedSchedule}
        onValueChange={setNonEstimatedSchedule}
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
