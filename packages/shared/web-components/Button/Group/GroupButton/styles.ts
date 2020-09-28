import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div<{ width: number }>`
  cursor: pointer;

  display: flex;
  align-items: center;
  flex-direction: column;

  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  fill: ${({ theme }) => theme.colors.text.secondary.dark};
  width: ${({ width }) => width}px;
  padding: 8px 16px;
  height: 100%;

  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(144, 145, 145, 0.1);
    color: ${darken(0.2, '#909191')};
    fill: ${darken(0.2, '#909191')};
  }

  &.active {
    background: rgba(219, 68, 55, 0.1);
    color: #db4437;
    fill: #db4437;
  }
`

export const IconWrapper = styled.div`
  svg {
    height: 32px;
    width: 32px;
  }
`

export const Label = styled.span`
  text-align: center;
  margin-top: 8px;
  font-size: 13px;
`
