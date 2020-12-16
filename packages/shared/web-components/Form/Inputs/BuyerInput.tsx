import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'

import { useField } from '@unform/core'
import styled from 'styled-components'

import { useAxios } from '@shared/axios'

import { InputProps } from '../types'
import { AsyncSelectInput } from './AsyncSelectInput'

export interface Buyer {
  code: number
  name: string
}

const BuyerInput: React.FC<InputProps> = ({ name, label }) => {
  const { fieldName, defaultValue, registerField } = useField(name)

  const [buyers, setBuyers] = useState<Buyer[]>(defaultValue || [])
  const [isExpanded, setExpanded] = useState(false)

  const [api] = useAxios()

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => buyers,
      setValue: (_: any, value: Buyer[]) => setBuyers(value),
      clearValue: (_: any, newValue: Buyer[]) => setBuyers(newValue)
    })
  }, [fieldName, registerField, buyers])

  return (
    <div>
      <AsyncSelectInput
        name={name}
        label={label}
        noOptionsMessage={() => 'Nenhum comprador encontrado'}
        onSelect={({ value, name }) => {
          setBuyers(curr => {
            if (curr.find(item => item.code === value)) {
              return curr
            }

            return [{ code: value, name }, ...curr]
          })
        }}
        loadOptions={inputValue =>
          new Promise(resolve => {
            api
              .get<Buyer[]>('/buyers', {
                params: { query: inputValue.toUpperCase() }
              })
              .then(result => {
                resolve(
                  result.data.map(({ code, name }) => ({
                    value: code,
                    label: `${code} - ${name}`,
                    name
                  }))
                )
              })
          })
        }
      />

      {buyers.length !== 0 ? (
        <Container>
          {(isExpanded ? buyers : buyers.slice(0, 3)).map(({ code, name }) => (
            <li key={code}>
              <span>
                {code} - {name}
              </span>

              <button
                type="button"
                onClick={() => {
                  setBuyers(curr => curr.filter(buyer => buyer.code !== code))
                }}
              >
                <MdClose size={16} />
              </button>
            </li>
          ))}

          {buyers.length > 3 && (
            <ShowButton onClick={() => setExpanded(curr => !curr)}>
              {isExpanded
                ? 'Mostrar menos'
                : `Mostrar mais ${buyers.length - 3} compradores`}
            </ShowButton>
          )}
        </Container>
      ) : (
        <EmptySelection>Nenhum comprador selecionado</EmptySelection>
      )}
    </div>
  )
}

export { BuyerInput }

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
    border: none;
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
