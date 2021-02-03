import styled from 'styled-components'

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;

  label {
    color: #999 !important;
    font-size: 13px;
    margin-bottom: 4px;
  }

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 8px;
  }
`
