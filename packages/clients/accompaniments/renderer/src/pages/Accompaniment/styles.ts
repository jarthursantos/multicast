import styled from 'styled-components'

export const Container = styled.div`
  display: flex;

  & > * {
    width: 345px;
  }

  padding: 8px;

  & > div {
    padding: 8px;
  }
`
