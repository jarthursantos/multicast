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
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 13px;
  height: 40px;
  width: 40px;

  transition: all 0.2s ease-in-out;

  :hover {
    background: #f0f0f0;
  }

  &.ANOTHER_MONTH {
    color: ${({ theme }) => theme.colors.text.caption.dark};
    font-size: 12px;

    svg {
      height: 8px;
      width: 8px;
    }
  }

  ${({ isToday }) =>
    isToday &&
    css`
      color: ${({ theme }) => theme.colors.text.primary.dark};
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Indicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 14px;
  width: 14px;
`
