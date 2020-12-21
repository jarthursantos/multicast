import React, { useEffect, useState } from 'react'
import { OptionTypeBase } from 'react-select'

import { useField } from '@unform/core'

import { useAxios } from '@shared/axios'

import { InputProps } from '../types'
import { AsyncSelectInput } from './AsyncSelectInput'

export interface IProvider {
  code: number
  name: string
}

type ISingleProviderInputProps = Omit<InputProps, 'inputProps'> & {
  inputProps?: { isDisabled: boolean }
}

const SingleProviderInput: React.FC<ISingleProviderInputProps> = props => {
  const { name, label, inputProps } = props

  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError
  } = useField(name)

  const [selection, setSelection] = useState<OptionTypeBase>(defaultValue)

  const [api] = useAxios()

  useEffect(() => {
    if (!defaultValue || selection) return

    const { code, name }: IProvider = defaultValue

    setSelection({ name, value: code, label: `${code} - ${name}` })
  }, [selection, defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        if (selection) {
          return { code: selection.value, name: selection.name }
        }

        return undefined
      },
      setValue: (_: any, value: IProvider) => {
        if (value) {
          setSelection({
            name: value.name,
            value: value.code,
            label: `${value.code} - ${value.name}`
          })
        } else {
          setSelection(undefined)
        }

        clearError && clearError()
      },
      clearValue: () => {
        setSelection(undefined)

        clearError && clearError()
      }
    })
  }, [fieldName, registerField, selection, clearError])

  return (
    <AsyncSelectInput
      name={name}
      label={label}
      error={error}
      selection={selection}
      setSelection={setSelection}
      inputProps={inputProps}
      noOptionsMessage={() => 'Nenhum fornecedor encontrado'}
      clearError={clearError}
      loadOptions={inputValue =>
        new Promise(resolve => {
          api
            .get<IProvider[]>('/providers', {
              params: { query: inputValue.toUpperCase() }
            })
            .then(result => {
              const options = result.data.map(({ code, name }) => ({
                label: `${code} - ${name}`,
                value: code,
                name
              }))

              resolve(options)
            })
            .catch(() => resolve([]))
        })
      }
    />
  )
}

export { SingleProviderInput }
