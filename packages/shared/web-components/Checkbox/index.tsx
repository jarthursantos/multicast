import React, { useCallback } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

import { Container, Label } from './styles'
import { Props } from './types'

const Checkbox: React.FC<Props> = ({ label, value, onValueChange }) => {
  const handleChange = useCallback(() => {
    onValueChange(!value)
  }, [value])

  return (
    <Container onClick={handleChange} type="button">
      {value ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}

      <Label>{label}</Label>
    </Container>
  )
}

export { Checkbox }
