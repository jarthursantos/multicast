import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  height: 120px;
  padding: 12px 0;

  & > * + * {
    margin-left: 8px;
  }
`
