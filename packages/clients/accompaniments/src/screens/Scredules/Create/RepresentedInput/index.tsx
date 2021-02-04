import React, { useEffect, useState } from 'react'

import { remote } from 'electron'

import { api, extractErrorMessage } from '@shared/axios'

import { Represented } from './Represented'
import { IRepresentedProvider } from './Represented/types'
import { Wrapper, Container, InputLabel } from './styles'
import { IRepresentedInputProps } from './types'

const RepresentedInput: React.VFC<IRepresentedInputProps> = ({
  label,
  // name,
  disabled,
  representative
}) => {
  const [representeds, setRepresenteds] = useState<IRepresentedProvider[]>([])
  const [providers, setProviders] = useState<IRepresentedProvider[]>([])

  useEffect(() => {
    if (!representative) {
      setRepresenteds([])
    } else {
      setRepresenteds(
        providers.filter(({ representative: { name } }) => {
          return name === representative.name
        })
      )
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

  return (
    <Wrapper>
      <InputLabel>{label}</InputLabel>

      <Container disabled={disabled}>
        {representeds.map(represented => (
          <Represented key={represented.code} data={represented} />
        ))}
      </Container>
    </Wrapper>
  )
}

export { RepresentedInput }
