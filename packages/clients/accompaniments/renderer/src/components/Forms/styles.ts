import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  h3 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-size: 16px;
    font-weight: 500;
  }

  & > * + * {
    margin-top: 12px;
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
