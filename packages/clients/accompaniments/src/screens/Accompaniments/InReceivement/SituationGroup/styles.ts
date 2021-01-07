import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * + * {
    margin-left: 8px;
  }
`
