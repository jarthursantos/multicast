import React, { useEffect, useState, useMemo } from 'react'

import { useField } from '@unform/core'

import {
  InputContainer,
  InputLabel,
  InputError
} from '@shared/web-components/Form/styles'
import { InputProps } from '@shared/web-components/Form/types'

import { CharCountWrapper, Wrapper } from './styles'

const KeyField: React.VFC<InputProps> = ({ name, label, inputProps }) => {
  const {
    defaultValue,
    clearError,
    error,
    fieldName,
    registerField
  } = useField(name)

  const [value, setValue] = useState<string>(defaultValue || '')

  const charCount = useMemo(() => value.length, [value])

  useEffect(() => {
    if (!value) {
      setValue(defaultValue?.replace(/\D/g, '') || '')
    }
  }, [value, defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
      clearValue: () => setValue('')
    })
  }, [registerField, fieldName, value])

  return (
    <Wrapper>
      <InputContainer hasError={!!error}>
        <InputLabel htmlFor={fieldName}>{label}</InputLabel>

        <input
          type="text"
          id={fieldName}
          onBlur={clearError}
          value={value}
          onChange={({ target }) => setValue(target.value.replace(/\D/g, ''))}
          {...inputProps}
        />

        {error && <InputError>{error}</InputError>}
      </InputContainer>

      <CharCountWrapper>{charCount}/44</CharCountWrapper>
    </Wrapper>
  )
}

export { KeyField }
