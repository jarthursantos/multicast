import { memo } from 'react'

import { Form as Unform } from '@unform/web'
import styled, { css } from 'styled-components'

const FormComponent = styled(Unform)`
  & > * + * {
    margin-top: 16px;
  }

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

export const Form = memo(FormComponent)

export interface InputContainerStyleProps {
  disabled?: boolean
  hasError?: boolean
  isSelect?: boolean
}

export const InputContainer = styled.div<InputContainerStyleProps>`
  display: flex;
  flex-direction: column;
  min-width: 10px;
  position: relative;

  input {
    border-width: 2px;
    border-style: solid;
    min-width: 10px;

    &[type='text'] {
      text-transform: uppercase;
    }

    &[type='email'] {
      text-transform: lowercase;
    }

    color: #666;
    font-size: 14px;
    transition: border 0.2s;

    ::placeholder {
      color: #999;
    }

    :disabled {
      border-color: #eee;
    }

    ${({ isSelect }) =>
      isSelect
        ? css``
        : css`
            padding: 6px 8px;
            min-height: 40px;
            border-radius: 4px;
          `}

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
  }

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
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: 12px 16px;
  margin-top: 0 !important;

  & > * + * {
    margin-left: 8px;
  }
`
