import styled from 'styled-components'

export const Container = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  flex-direction: column;

  border-radius: 4px 4px 0 0;
  color: ${({ theme }) => theme.colors.text.secondary.light};
  margin-bottom: -1px;
  padding: 8px 16px;
  transition: all 0.2s ease-in-out;

  &.active {
    cursor: default;
    background: ${({ theme }) => theme.colors.background.light};
    color: ${({ theme }) => theme.colors.text.secondary.dark};
  }
`

export const Label = styled.span`
  text-align: center;
  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
