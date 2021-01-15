import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useField } from '@unform/core'

import { api } from '@shared/axios'

import { Button } from '../../../Button'
import { InputLabel, InputContainer, InputError } from '../../styles'
import { openBuyerFinderWindow } from './Finder/action'
import { Container, FieldWrapper } from './styles'
import { IBuyerInputProps } from './types'

export interface IBuyer {
  code: number
  name: string
}

const BuyerInput: React.VFC<IBuyerInputProps> = ({
  name,
  label,
  disabled,
  single
}) => {
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError
  } = useField(name)

  const inputCodeRef = useRef<HTMLInputElement>(null)

  const [buyerCode, setBuyerCode] = useState('')
  const [buyerName, setBuyerName] = useState('')

  const [loading, setLoading] = useState<boolean>(false)
  const [buyers, setBuyers] = useState<IBuyer[]>([])

  const handleOpenFinder = useCallback(() => {
    const result = openBuyerFinderWindow(single)

    if (result.length !== 0) {
      setBuyers(result)
      if (single || result.length === 1) {
        const [provider] = result

        setBuyerCode(String(provider.code))
        setBuyerName(provider.name)
      } else {
        setBuyerCode('MULTI')
        setBuyerName(result.map(({ name }) => name).join(', '))
      }
    }
  }, [single])

  const handleSearchByCode = useCallback(async () => {
    if (buyerCode.length === 0) {
      return
    }

    try {
      setLoading(true)

      const { data } = await api.get<IBuyer>(`/buyers/${buyerCode}`)

      setBuyers([data])

      setBuyerCode(String(data.code))
      setBuyerName(data.name)
    } catch (error) {
      setBuyerCode('')
      setBuyerName('')

      inputCodeRef.current?.focus()
    } finally {
      setLoading(false)
    }

    clearError && clearError()
  }, [buyerCode, clearError, inputCodeRef])

  useEffect(() => {
    let value: IBuyer[]

    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        value = defaultValue
      } else {
        value = [defaultValue]
      }

      setBuyers(value)
    } else {
      value = []
    }

    if (value.length !== 0) {
      if (single || value.length === 1) {
        const [provider] = value

        setBuyerCode(String(provider.code))
        setBuyerName(provider.name)
      } else {
        setBuyerCode('MULTI')
        setBuyerName(value.map(({ name }) => name).join(', '))
      }
    }
  }, [defaultValue, single])

  useEffect(() => {
    registerField({
      name: fieldName,
      setValue: (_, value: IBuyer | IBuyer[]) => {
        if (Array.isArray(value)) {
          setBuyers(value)
        } else {
          setBuyers([value])
        }
      },
      getValue: () => {
        return buyers
      },
      clearValue: () => {
        setBuyers([])
      }
    })
  }, [fieldName, buyers])

  return (
    <InputContainer hasError={Boolean(error)}>
      {label && <InputLabel>{label}</InputLabel>}

      <Container>
        <FieldWrapper className="code">
          <span>Código</span>
          <input
            ref={inputCodeRef}
            onBlur={handleSearchByCode}
            value={buyerCode}
            onChange={e => setBuyerCode(e.target.value)}
          />
        </FieldWrapper>

        <Button
          secondary
          label="..."
          tabIndex={-1}
          loading={loading}
          disabled={disabled}
          onClick={handleOpenFinder}
        />

        <FieldWrapper className="name">
          <span>Nome</span>
          <input readOnly tabIndex={-1} disabled={disabled} value={buyerName} />
        </FieldWrapper>
      </Container>

      {Boolean(error) && <InputError>{error}</InputError>}
    </InputContainer>
  )
}

export { BuyerInput }
