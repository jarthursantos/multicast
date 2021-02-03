import React, { useEffect, useState } from 'react'

import { api } from '@shared/axios'

import { SelectInput } from '../SelectInput'
import { IRepresentativeInputProps, IRepresentative } from './types'

const RepresentativeInput: React.VFC<IRepresentativeInputProps> = props => {
  const { name, label, buyer, disabled } = props

  const [representatives, setRepresentatives] = useState<IRepresentative[]>([])
  const [options, setOptions] = useState([])

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

      setRepresentatives(data)
    }

    loadOptions()
  }, [])

  return (
    <SelectInput
      name={name}
      label={label}
      inputProps={{ options, isDisabled: disabled }}
      clearOnOptionsChange
    />
  )
}

export { RepresentativeInput }
