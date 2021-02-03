import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useField } from '@unform/core'

import { api } from '@shared/axios'

import { Button } from '../../../Button'
import { InputLabel, InputContainer, InputError } from '../../styles'
import { openProviderFinderWindow } from './Finder/action'
import { Container, FieldWrapper } from './styles'
import { IProviderInputProps, IProvider } from './types'

const ProviderInput: React.VFC<IProviderInputProps> = ({
  name,
  label,
  disabled,
  single,
  onProvidersChange
}) => {
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError
  } = useField(name)

  const inputCodeRef = useRef<HTMLInputElement>(null)

  const [providerCode, setProviderCode] = useState('')
  const [providerName, setProviderName] = useState('')

  const [loading, setLoading] = useState<boolean>(false)
  const [providers, setProviders] = useState<IProvider[]>([])

  const handleOpenFinder = useCallback(() => {
    const result = openProviderFinderWindow(single)

    if (result.length !== 0) {
      setProviders(result)
      if (single || result.length === 1) {
        const [provider] = result

        setProviderCode(String(provider.code))
        setProviderName(provider.name)
      } else {
        setProviderCode('MULTI')
        setProviderName(result.map(({ name }) => name).join(', '))
      }
    }
  }, [single])

  const handleSearchByCode = useCallback(async () => {
    if (providerCode.length === 0 || providerCode === 'MULTI') {
      return
    }

    try {
      setLoading(true)

      const { data } = await api.get<IProvider>(`/providers/${providerCode}`)

      setProviders([data])

      setProviderCode(String(data.code))
      setProviderName(data.name)
    } catch (error) {
      setProviderCode('')
      setProviderName('')

      inputCodeRef.current?.focus()
    } finally {
      setLoading(false)
    }

    clearError && clearError()
  }, [providerCode, clearError, inputCodeRef])

  useEffect(() => {
    let value: IProvider[]

    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        value = defaultValue
      } else {
        value = [defaultValue]
      }

      setProviders(value)
    } else {
      value = []
    }

    if (value.length !== 0) {
      if (single || value.length === 1) {
        const [provider] = value

        setProviderCode(String(provider.code))
        setProviderName(provider.name)
      } else {
        setProviderCode('MULTI')
        setProviderName(value.map(({ name }) => name).join(', '))
      }
    }
  }, [defaultValue, single])

  useEffect(() => {
    registerField({
      name: fieldName,
      setValue: (_, value: IProvider | IProvider[]) => {
        if (Array.isArray(value)) {
          setProviders(value)
        } else {
          setProviders([value])
        }
      },
      getValue: () => {
        return providers
      },
      clearValue: () => {
        setProviders([])
      }
    })
  }, [fieldName, providers])

  useEffect(() => {
    if (onProvidersChange) {
      onProvidersChange(providers || [])
    }
  }, [onProvidersChange, providers])

  return (
    <InputContainer hasError={Boolean(error)}>
      {label && <InputLabel>{label}</InputLabel>}

      <Container>
        <FieldWrapper className="code">
          <span>Código</span>
          <input
            ref={inputCodeRef}
            onBlur={handleSearchByCode}
            value={providerCode}
            onChange={e => setProviderCode(e.target.value)}
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
          <input
            readOnly
            tabIndex={-1}
            disabled={disabled}
            value={providerName}
          />
        </FieldWrapper>
      </Container>

      {Boolean(error) && <InputError>{error}</InputError>}
    </InputContainer>
  )
}

export { ProviderInput }
export * from './types'
