import React, { useEffect } from 'react'

import { useField } from '@unform/core'

interface Props {
  divergence: string
  index: number
}

const DivergenceField: React.FC<Props> = ({ divergence, index }) => {
  const { fieldName, registerField } = useField(`invoices[${index}].divergence`)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => divergence
    })
  }, [fieldName, registerField, divergence])

  return <div />
}

export default DivergenceField
