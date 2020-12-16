import styled, { css } from 'styled-components'

interface Props {
  isToday: boolean
  selected: boolean
}

export const Wrapper = styled.div<Props>`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  color: #666;
  font-size: 13px;
  height: 32px;
  width: 32px;

  transition: all 0.2s ease-in-out;

  :hover {
    background: #f0f0f0;
  }

  &.ANOTHER_MONTH {
    color: #999;
    font-size: 12px;

    svg {
      height: 8px;
      width: 8px;
    }
  }

  ${({ isToday }) =>
    isToday &&
    css`
      color: #333;
      font-weight: bold;
    `}

  ${({ selected }) =>
    selected &&
    css`
      cursor: default;
      background: rgba(219, 68, 55, 0.1);
      color: #db4437;

      :hover {
        background: rgba(219, 68, 55, 0.1);
        color: #db4437;
      }
    `}
`
