import React from 'react'

import { ButtonGroupContextProvider } from './context'
import GroupButton from './GroupButton'
import { Container } from './styles'
import { ButtonGroupProps } from './types'

const ButtonGroup: React.VFC<ButtonGroupProps> & {
  Button: typeof GroupButton
} = ({ children, initialButton, onSelectionChange }) => {
  return (
    <ButtonGroupContextProvider
      initialButton={initialButton}
      onChange={onSelectionChange}
    >
      <Container>{children}</Container>
    </ButtonGroupContextProvider>
  )
}

ButtonGroup.Button = GroupButton

export { ButtonGroup }
