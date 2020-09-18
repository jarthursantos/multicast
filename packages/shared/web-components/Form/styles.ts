import { Form as Unform } from '@unform/web'
import styled, { css } from 'styled-components'

export const Form = styled(Unform)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
    min-width: 40px;
    text-align: right;
  }
`

export interface InputContainerStyleProps {
  disabled?: boolean
}

export const InputContainer = styled.div<InputContainerStyleProps>`
  display: flex;
  flex-direction: column;
  min-width: 10px;
  position: relative;

  & > div.relative {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      * {
        cursor: default;
      }
    `}
`

export const InputLabel = styled.label`
  color: #666;
  font-size: 13px;
  margin-bottom: 8px;
`

export interface InputStyleProps {
  hasError?: boolean
}

export const Input = styled.input<InputStyleProps>`
  border-width: 2px;
  border-style: solid;
  min-width: 10px;
  text-transform: uppercase;

  border-radius: 4px;
  color: #666;
  font-size: 14px;
  padding: 6px 8px;
  transition: border 0.2s;

  ::placeholder {
    color: #999;
  }

  :disabled {
    border-color: #eee;
  }

  ${({ hasError }) =>
    hasError
      ? css`
          border-color: #de3b3b !important;
        `
      : css`
          border-color: #ccc;

          :focus {
            border: 2px solid #999;
          }
        `};
`

export const InputError = styled.span.attrs({
  className: 'error'
})`
  position: absolute;
  right: 0;
  font-size: 11px;
  line-height: 18px;
  color: #de3b3b !important;
`
