import React, { useCallback, useEffect, useState } from 'react'

import { api } from '@shared/axios'

import { SelectInput } from '../SelectInput'
import { IRepresentativeInputProps, IRepresentative } from './types'

const RepresentativeInput: React.VFC<IRepresentativeInputProps> = props => {
  const { name, label, buyer, disabled, onRepresentativeChange } = props

  const [representatives, setRepresentatives] = useState<IRepresentative[]>([])
  const [options, setOptions] = useState([])

  const handleRepresentativeChange = useCallback(
    (code: number) => {
      if (onRepresentativeChange) {
        const representative = representatives.find(
          ({ provider }) => provider.code === code
        )

        onRepresentativeChange(representative)
      }
    },
    [onRepresentativeChange, representatives]
  )

  useEffect(() => {
    if (buyer) {
      const filtered = representatives
        .filter(({ provider }) => provider.buyer.code === buyer.code)
        .map(({ name, provider }) => ({ value: provider.code, label: name }))

      setOptions(filtered)
    } else {
      setOptions([])
    }
  }, [buyer, representatives])

  useEffect(() => {
    async function loadOptions() {
      const { data } = await api.get<IRepresentative[]>(
        'http://192.168.1.2:3334/representatives'
      )

      setRepresentatives(
        data
          .filter(({ provider }) => provider.code === provider.principalCode)
          .reduce<IRepresentative[]>((curr, representative) => {
            const alreadyAdded = curr.find(
              ({ name }) =>
                representative.name.trim().toUpperCase() ===
                name.trim().toUpperCase()
            )

            if (!alreadyAdded) {
              curr.push(representative)
            }

            return curr
          }, [])
      )
    }

    loadOptions()
  }, [])

  return (
    <SelectInput
      name={name}
      label={label}
      inputProps={{ options, isDisabled: disabled }}
      clearOnOptionsChange
      onSelectionChange={handleRepresentativeChange}
    />
  )
}

export { RepresentativeInput }
