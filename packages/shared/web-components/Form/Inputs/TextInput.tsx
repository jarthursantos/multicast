import React, { useEffect, useRef } from 'react'

import { useField } from '@unform/core'

import { InputContainer, Input, InputLabel, InputError } from '../styles'
import { InputProps } from '../types'

type Props = InputProps & React.HTMLAttributes<HTMLDivElement>

const TextInput: React.FC<Props> = ({ name, label, inputProps, ...rest }) => {
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
      path: 'value'
    })
  }, [fieldName, inputRef, registerField])

  return (
    <InputContainer {...rest}>
      {label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

      <Input
        size={1}
        {...inputProps}
        ref={inputRef}
        id={fieldName}
        onFocus={clearError}
        defaultValue={defaultValue}
      />

      {error && <InputError>{error}</InputError>}
    </InputContainer>
  )
}

export { TextInput }
