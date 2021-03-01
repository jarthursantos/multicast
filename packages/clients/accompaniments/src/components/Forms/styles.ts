import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: calc(100vh - 62px);

  h3 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-size: 16px;
    font-weight: 500;
  }

  & > * {
    margin-bottom: 8px;
  }

  ::-webkit-scrollbar-track:vertical,
  ::-webkit-scrollbar-thumb:vertical {
    border-left: 0;
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
