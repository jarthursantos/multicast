import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.button<{ width: number }>`
  cursor: pointer;

  display: flex;
  align-items: center;
  flex-direction: column;

  background: none;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  fill: ${({ theme }) => theme.colors.text.secondary.dark};
  width: ${({ width }) => width}px;
  padding: 8px 16px;
  height: 96px;

  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(144, 145, 145, 0.1);
    border-color: rgba(144, 145, 145, 0.2);
    color: ${darken(0.2, '#909191')};
    fill: ${darken(0.2, '#909191')};
  }

  &.active {
    background: rgba(219, 68, 55, 0.1);
    border-color: rgba(219, 68, 55, 0.2);
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
