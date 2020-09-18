import React from 'react'

import { Button, ButtonProps } from '@shared/web-components/Button'

const SubmitButton: React.FC<ButtonProps> = props => {
  return <Button {...props} type="submit"></Button>
}

export { SubmitButton }
