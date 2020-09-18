import { Form as Unform } from '@unform/web'
import styled from 'styled-components'

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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputLabel = styled.label``

export const Input = styled.input``

export const InputError = styled.span.attrs({
  className: 'error'
})``
