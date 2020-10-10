import React, { useEffect, useRef, useState } from 'react'
import ReactInputMask from 'react-input-mask'

import { useField } from '@unform/core'
import { parse, parseISO, format } from 'date-fns'

import { InputContainer, InputLabel, InputError } from '../styles'
import { InputProps } from '../types'

type Props = InputProps & React.HTMLAttributes<HTMLDivElement>

const DateInput: React.FC<Props> = ({ name, label, inputProps, ...rest }) => {
  const inputRef = useRef(null)

  const [date, setDate] = useState<Date | string | null>(null)
  const [textValue, setTextValue] = useState('')

  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError
  } = useField(name)

  useEffect(() => {
    if (!textValue || textValue.length !== 10) {
      setDate(null)
      return
    }

    const parsedDate = parse(textValue, 'dd/MM/yyyy', new Date())

    setDate(parsedDate)
  }, [textValue])

  useEffect(() => {
    if (defaultValue instanceof Date) {
      setTextValue(format(defaultValue, 'dd/MM/yyyy'))
    } else if (typeof defaultValue === 'string') {
      setTextValue(format(parseISO(defaultValue), 'dd/MM/yyyy'))
    }
  }, [defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: () => date,
      setValue: (_: any, value: Date | string) => {
        setDate(value)

        if (value instanceof Date) {
          setTextValue(format(value, 'dd/MM/yyyy'))
        } else if (typeof value === 'string') {
          setTextValue(format(parseISO(value), 'dd/MM/yyyy'))
        }
      },
      clearValue: () => {
        setDate(null)
        setTextValue('')
      }
    })
  }, [fieldName, inputRef, registerField, date])

  return (
    <InputContainer {...rest} hasError={!!error}>
      {label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

      <ReactInputMask
        size={1}
        type="text"
        {...inputProps}
        mask="99/99/9999"
        maskChar={null}
        ref={inputRef}
        id={fieldName}
        onFocus={clearError}
        value={textValue}
        onChange={event => setTextValue(event.target.value)}
      />

      {error && <InputError>{error}</InputError>}
    </InputContainer>
  )
}

export { DateInput }
