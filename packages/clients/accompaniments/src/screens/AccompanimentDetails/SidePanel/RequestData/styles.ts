import styled from 'styled-components'

export const Container = styled.div`
  grid-area: REQUEST;

  position: relative;

  display: flex;
  flex-direction: column;
  padding: 16px;

  & > * + * {
    margin-top: 8px;
  }
`

export const Inline = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
  }
`

export const InlineWithLargeField = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 3;
  }

  & > * + * {
    flex: 1;
    margin-left: 12px;
  }
`
