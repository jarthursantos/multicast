import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { OptionTypeBase } from 'react-select'

import { useField } from '@unform/core'
import styled from 'styled-components'

import { useAxios } from '@shared/axios'

import { InputProps } from '../../types'
import { IProvider } from '../SingleProviderInput'
import { AsyncSelectInput } from './AsyncSelectInput'

const MultipleProviderInput: React.FC<
  Omit<InputProps, 'inputProps'> & {
    inputProps?: { isDisabled: boolean }
  }
> = ({ name, label, inputProps }) => {
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError
  } = useField(name)
  const [selection, setSelection] = useState<OptionTypeBase>()

  const [providers, setProviders] = useState<IProvider[]>(defaultValue || [])
  const [isExpanded, setExpanded] = useState(false)

  const [api] = useAxios()

  useEffect(() => {
    if (defaultValue) {
      setProviders(defaultValue)
    }
  }, [defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => providers,
      setValue: (_: any, value: IProvider[]) => {
        setProviders(value)
        clearError && clearError()
      },
      clearValue: (_: any, newValue: IProvider[]) => {
        setProviders(newValue)
        clearError && clearError()
      }
    })
  }, [fieldName, registerField, providers, clearError])

  return (
    <div>
      <AsyncSelectInput
        name={name}
        label={label}
        error={error}
        selection={selection}
        setSelection={setSelection}
        inputProps={inputProps}
        noOptionsMessage={() => 'Nenhum fornecedor encontrado'}
        clearError={clearError}
        onSelect={({ value, name }) => {
          clearError && clearError()

          setProviders(curr => {
            if (curr.find(item => item.code === value)) {
              return curr
            }

            return [{ code: value, name }, ...curr]
          })
        }}
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

      {providers.length !== 0 ? (
        <Container>
          {(isExpanded ? providers : providers.slice(0, 3)).map(
            ({ code, name }) => (
              <li key={code}>
                <span>
                  {code} - {name}
                </span>

                <button
                  type="button"
                  disabled={inputProps?.isDisabled}
                  onClick={() => {
                    setProviders(curr =>
                      curr.filter(provider => provider.code !== code)
                    )
                  }}
                >
                  <MdClose size={16} />
                </button>
              </li>
            )
          )}

          {providers.length > 3 && (
            <ShowButton
              type="button"
              onClick={() => setExpanded(curr => !curr)}
            >
              {isExpanded
                ? 'Mostrar menos'
                : `Mostrar mais ${providers.length - 3} fornecedores`}
            </ShowButton>
          )}
        </Container>
      ) : (
        <EmptySelection>Nenhum fornecedor selecionado</EmptySelection>
      )}
    </div>
  )
}

export { MultipleProviderInput }

const Container = styled.ul`
  margin-top: 8px;
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #666;
    font-size: 14px;
    text-transform: uppercase;
  }
  li span {
    flex: 1;
    padding: 4px 8px;
    border: 2px solid #ccc;
    border-right: 0;
    border-radius: 4px 0 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  li button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    color: #999;
    border: 2px solid #ccc;
    border-radius: 0 4px 4px 0;
    height: 29px;
    width: 29px;
    transition: all 0.2s ease-in-out;
    &:hover,
    &:focus {
      background: #de3b3b;
      border-color: #de3b3b;
      color: #fff;
    }
    &:disabled {
      cursor: default;
      background: #f0f0f0;
      border: 2px solid #ccc;
      color: #999;
    }
  }
  li + li,
  li + button {
    margin-top: 4px;
  }
`

const ShowButton = styled.button`
  border: none;
  background: none;
  color: #3b6cde;
  width: 100%;
  padding: 4px 0;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  :hover,
  :focus {
    color: #154fd4;
    background-color: #ddd;
  }
`

const EmptySelection = styled.div`
  border-radius: 4px;
  background-color: #f0f0f0;
  border: 2px solid #ddd;
  padding: 4px 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 8px;
`
