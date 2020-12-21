import React from 'react'
import Loading from 'react-loading'

import { Container, Label } from './styles'
import { ButtonProps } from './types'

const Button: React.FC<ButtonProps> = ({
  loading,
  label,
  type = 'button',
  secondary,
  disabled,
  icon,
  ...rest
}) => {
  return (
    <Container
      {...rest}
      type={type}
      disabled={disabled || loading}
      className={secondary ? 'secondary' : 'primary'}
    >
      <Label invisible={loading}>{icon || label}</Label>

      {loading && (
        <Loading
          color={secondary ? '#666' : '#fff'}
          className="loader"
          type="spin"
          width={20}
          height={20}
        />
      )}
    </Container>
  )
}

export * from './ActionIconButton'
export * from './Group'
export * from './types'
export { Button }
