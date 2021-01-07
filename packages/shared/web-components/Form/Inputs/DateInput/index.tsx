import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdToday } from 'react-icons/md'
import ReactInputMask from 'react-input-mask'

import { useField } from '@unform/core'
import { parse, parseISO, format } from 'date-fns'
import styled from 'styled-components'

import {
  InputContainer,
  InputLabel,
  InputError
} from '@shared/web-components/Form/styles'
import { InputProps } from '@shared/web-components/Form/types'

import { DatePicker } from './Picker'
import { PickerHandlers } from './Picker/types'

type Props = InputProps &
  React.HTMLAttributes<HTMLDivElement> & {
    position?: 'top' | 'bottom'
  }

const DateInput: React.FC<Props> = ({
  name,
  label,
  position = 'bottom',
  inputProps,
  ...rest
}) => {
  const inputRef = useRef(null)
  const pickerRef = useRef<PickerHandlers>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [date, setDate] = useState<Date | string | null>(null)
  const [textValue, setTextValue] = useState('')

  const handlePickerDate = useCallback((date: Date) => {
    setDate(date)
    setTextValue(format(date, 'dd/MM/yyyy'))
  }, [])

  const handleOpenPicker = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect()

    if (rect) {
      let selection: Date | undefined

      if (date instanceof Date) {
        selection = date
      } else if (typeof date === 'string') {
        selection = parse(textValue, 'dd/MM/yyyy', new Date())
      }

      pickerRef.current?.open(rect, selection)
    }
  }, [containerRef, pickerRef, date, textValue])

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
    <React.Fragment>
      <InputContainer ref={containerRef} {...rest} hasError={!!error}>
        {label && <InputLabel htmlFor={fieldName}>{label}</InputLabel>}

        <div className="relative">
          <ReactInputMask
            size={1}
            type="text"
            {...inputProps}
            mask="99/99/9999"
            ref={inputRef}
            id={fieldName}
            onFocus={clearError}
            value={textValue}
            onChange={event => setTextValue(event.target.value)}
          />

          {inputProps?.disabled || (
            <IconWrapper onClick={handleOpenPicker}>
              <MdToday size={24} />
            </IconWrapper>
          )}
        </div>

        {error && <InputError>{error}</InputError>}
      </InputContainer>

      <DatePicker
        ref={pickerRef}
        onSelectionChange={handlePickerDate}
        position={position}
      />
    </React.Fragment>
  )
}

const IconWrapper = styled.button.attrs({
  type: 'button',
  tabIndex: -1
})`
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  border-radius: 4px;
  color: #999;
  width: 36px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #666;
  }
`

export { DateInput }
