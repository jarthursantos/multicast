import styled from 'styled-components'

export const Container = styled.div`
  padding: 16px;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`

export const InlineServerContainer = styled.div`
  display: flex;
  flex-direction: row;

  .server {
    flex: 1;
  }

  & > * + * {
    margin-left: 8px;
  }
`
