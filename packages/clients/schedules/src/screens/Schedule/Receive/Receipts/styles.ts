import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;
  padding: 16px;

  & > * + * {
    margin-top: 16px;
  }
`
