import React from 'react'

import { ButtonGroupContextProvider } from './context'
import GroupButton from './GroupButton'
import { Container } from './styles'
import { ButtonGroupProps } from './types'

const ButtonGroup: React.VFC<ButtonGroupProps> & {
  Button: typeof GroupButton
} = ({ children, currentButton, onSelectionChange }) => {
  return (
    <ButtonGroupContextProvider
      currentButton={currentButton}
      onChange={onSelectionChange}
    >
      <Container>{children}</Container>
    </ButtonGroupContextProvider>
  )
}

ButtonGroup.Button = GroupButton

export { ButtonGroup }
