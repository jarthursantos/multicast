import styled from 'styled-components'

export const Wrapper = styled.div`
  overflow-y: scroll;
  flex: 1;
  padding: 8px;

  & > * + * {
    margin-top: 4px;
  }
`
