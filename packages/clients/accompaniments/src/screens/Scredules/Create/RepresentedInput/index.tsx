import React, { useEffect, useState } from 'react'

import { useField } from '@unform/core'
import { remote } from 'electron'

import { api, extractErrorMessage } from '@shared/axios'

import { Represented } from './Represented'
import { IRepresentedProvider } from './Represented/types'
import { Wrapper, Container, InputLabel } from './styles'
import { IRepresentedInputProps } from './types'

const RepresentedInput: React.VFC<IRepresentedInputProps> = ({
  label,
  name,
  disabled,
  representative,
  onRepresentedChanges
}) => {
  const { fieldName, error, registerField, defaultValue } = useField(name)

  const [representeds, setRepresenteds] = useState<IRepresentedProvider[]>([])
  const [providers, setProviders] = useState<IRepresentedProvider[]>([])
  const [selections, setSelections] = useState<boolean[]>([])

  useEffect(() => {
    if (!representative) {
      setRepresenteds([])
      setSelections([])
    } else {
      const filtered = providers.filter(({ representative: { name } }) => {
        return name === representative.name
      })

      setRepresenteds(filtered)
      setSelections(filtered.map(() => false))
    }
  }, [representative, providers])

  useEffect(() => {
    async function loadProviders() {
      try {
        const { data } = await api.get<IRepresentedProvider[]>(
          'http://192.168.1.2:3334/providers'
        )

        setProviders(
          data
            .filter(({ code, principalCode }) => code === principalCode)
            .sort((represented, other) => {
              if (represented.name > other.name) {
                return 1
              }

              if (represented.name < other.name) {
                return -1
              }

              return 0
            })
        )
      } catch (error) {
        const message = extractErrorMessage(error)

        remote?.dialog.showErrorBox(
          'Erro ao carregar os fornecedores',
          String(message)
        )
      }
    }

    loadProviders()
  }, [])

  useEffect(() => {
    if (onRepresentedChanges) {
      onRepresentedChanges(representeds.filter((_, index) => selections[index]))
    }
  }, [representeds, selections, onRepresentedChanges])

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        return representeds.filter((_, index) => selections[index])
      }
      // setValue: (_, data) => {}
    })
  }, [fieldName, registerField, representeds, selections])

  return (
    <Wrapper>
      <InputLabel>{label}</InputLabel>

      <Container disabled={disabled}>
        {representeds.map((represented, index) => (
          <Represented
            key={represented.code}
            data={represented}
            value={selections[index]}
            onValueChange={selected => {
              setSelections(curr =>
                curr.map<boolean>((value, i) => {
                  if (i === index) {
                    return selected
                  }

                  return value
                })
              )
            }}
          />
        ))}
      </Container>
    </Wrapper>
  )
}

export { RepresentedInput }
