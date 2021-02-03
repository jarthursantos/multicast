import React, { useEffect, useMemo, useState } from 'react'

import { InputLabel } from '../../styles'
import { SelectInput } from '../SelectInput'
import { InputWrapper, InputContainer } from './styles'
import { ITimeInputProps } from './types'

function normalizeHour(hour: number) {
  let prefix = ''

  if (hour <= 9) {
    prefix = '0'
  }

  return `${prefix}${hour}`
}

const TimeInput: React.VFC<ITimeInputProps> = ({
  name,
  label,
  minHour = 7,
  maxHour = 18,
  minutesStep = 30,
  onHourChange
}) => {
  const [currentHour, setCurrentHour] = useState<number>(undefined)
  const [currentMinute, setCurrentMinute] = useState<number>(undefined)

  const hours = useMemo(() => {
    const result = []

    for (let hour = minHour; hour <= maxHour; hour++) {
      result.push({ label: normalizeHour(hour), value: hour })
    }

    return result
  }, [minHour, maxHour])

  const minutes = useMemo(() => {
    const result = []

    for (let minute = 0; minute < 60; minute += minutesStep) {
      result.push({ label: normalizeHour(minute), value: minute })
    }

    return result
  }, [minutesStep])

  useEffect(() => {
    if (onHourChange && currentHour !== undefined) {
      onHourChange({ hour: currentHour, minute: currentMinute || 0 })
    }
  }, [currentHour, currentMinute, onHourChange])

  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>

      <InputContainer>
        <SelectInput
          onSelectionChange={setCurrentHour}
          name={`${name}.hour`}
          label="Hora"
          inputProps={{ options: hours, maxMenuHeight: 100 }}
        />

        <SelectInput
          onSelectionChange={setCurrentMinute}
          name={`${name}.minute`}
          label="Minutos"
          inputProps={{
            options: minutes,
            maxMenuHeight: 100
          }}
        />
      </InputContainer>
    </InputWrapper>
  )
}

export { TimeInput }
export * from './types'
