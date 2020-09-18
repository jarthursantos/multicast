import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  padding: 16px;

  & > * + * {
    margin-left: 8px;
  }

  & > .name {
    flex: 1;
  }
`
