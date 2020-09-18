import React, { useEffect, useRef } from 'react'

import { useField } from '@unform/core'

import { InputContainer, Input, InputLabel, InputError } from '../styles'
import { InputProps } from '../types'

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    double?: boolean
    width?: number
  }

const NumberInput: React.FC<Props> = ({
  name,
  label,
  double,
  width = 60,
  ...rest
}) => {
  const inputRef = useRef(null)

  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError
  } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (input: HTMLInputElement) => {
        const { value } = input
        const parsedValue = parseInt(value)

        if (!isNaN(parsedValue)) {
          return parseInt(value)
        }

        return NaN
      },
      setValue: (input: HTMLInputElement, value: string | number) => {
        const normalizedValue = String(value)

        input.value = normalizedValue
      },
      clearValue: (input: HTMLInputElement) => {
        input.value = ''
      }
    })
  }, [fieldName, inputRef, registerField])

  return (
    <InputContainer>
      {label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

      <Input
        size={1}
        {...rest}
        type="number"
        ref={inputRef}
        id={fieldName}
        style={{ width }}
        onFocus={clearError}
        step={double ? 0.1 : 1}
        defaultValue={defaultValue}
      />

      {error && <InputError>{error}</InputError>}
    </InputContainer>
  )
}

export { NumberInput }
