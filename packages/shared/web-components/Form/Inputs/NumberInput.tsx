import React, { useEffect, useRef } from 'react'

import { useField } from '@unform/core'

import { InputContainer, InputLabel, InputError } from '../styles'
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
  inputProps,
  width,
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
    <InputContainer {...rest} hasError={!!error}>
      {label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

      <input
        size={1}
        {...inputProps}
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
