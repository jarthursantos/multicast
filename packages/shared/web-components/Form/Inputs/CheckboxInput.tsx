import React, { useEffect, useState } from 'react'

import { useField } from '@unform/core'

import { Checkbox } from '@shared/web-components/Checkbox'

import { InputProps } from '../types'

type Props = Omit<InputProps, 'inputProps'>

const CheckboxInput: React.FC<Props> = ({ name, label }) => {
  const { fieldName, defaultValue, registerField } = useField(name)

  const [checked, onCheckedChange] = useState(defaultValue || false)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => checked,
      setValue: (_: any, newValue: boolean) => onCheckedChange(newValue),
      clearValue: (_: any, newValue: boolean) => onCheckedChange(newValue)
    })
  }, [fieldName, registerField, checked])

  return (
    <Checkbox label={label} value={checked} onValueChange={onCheckedChange} />
  )
}

export { CheckboxInput }
