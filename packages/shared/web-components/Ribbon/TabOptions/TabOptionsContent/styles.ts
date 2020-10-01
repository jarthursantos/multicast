import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;

  & > * + * {
    margin-left: 8px;
  }
`

export const Separator = styled.div`
  height: 80px;
  width: 1px;
  background: ${({ theme }) => theme.colors.border.secondary};
  margin-left: 12px !important;
  margin-right: 4px;
`
