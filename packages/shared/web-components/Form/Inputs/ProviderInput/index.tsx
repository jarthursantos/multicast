import React, { useCallback, useEffect, useState } from 'react'

import { useField } from '@unform/core'
import { remote } from 'electron'

import { api, extractErrorMessage } from '@shared/axios'

import { Button } from '../../../Button'
import { InputLabel, InputContainer, InputError } from '../../styles'
import { IProvider } from '../SingleProviderInput'
import { Container, FieldWrapper } from './styles'
import { IProviderInputProps } from './types'

const ProviderInput: React.VFC<IProviderInputProps> = ({
  name,
  label,
  disabled,
  single
}) => {
  const { fieldName, registerField, error, clearError } = useField(name)

  const [providerCode, setProviderCode] = useState('')
  const [providerName, setProviderName] = useState('')

  const [loading, setLoading] = useState<boolean>(false)
  const [providers, setProviders] = useState<IProvider[]>([])

  const handleSearchByCode = useCallback(async () => {
    if (providerCode.length === 0) {
      return
    }

    try {
      setLoading(true)

      const { data } = await api.get<IProvider>(`/providers/${providerCode}`)

      setProviders([data])

      setProviderCode(String(data.code))
      setProviderName(data.name)
    } catch (error) {
      const message = extractErrorMessage(error)

      remote?.dialog.showErrorBox(
        'Não foi possível buscar o fornecedor',
        String(message)
      )
    } finally {
      setLoading(false)
    }

    clearError && clearError()
  }, [providerCode, clearError])

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

  return (
    <InputContainer hasError={Boolean(error)}>
      <InputLabel>{label}</InputLabel>

      <Container>
        <FieldWrapper className="code">
          <span>Código</span>
          <input
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
