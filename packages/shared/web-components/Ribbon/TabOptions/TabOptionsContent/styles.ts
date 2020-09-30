import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;

  & > * + * {
    margin-left: 12px;
  }
`

export const Separator = styled.div`
  height: 80px;
  width: 1px;
  background: ${({ theme }) => theme.colors.border.secondary};
`
