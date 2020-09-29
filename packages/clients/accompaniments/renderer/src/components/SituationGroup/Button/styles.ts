import { darken } from 'polished'
import styled from 'styled-components'

export const Wrapper = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  /* border-color: ${({ theme }) => theme.colors.border.secondary}; */
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  fill: ${({ theme }) => theme.colors.text.secondary.dark};
  padding: 8px 12px 8px 8px;

  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(144, 145, 145, 0.1);
    border-color: rgba(144, 145, 145, 0.2);
    /* border-color: ${darken(0.2, '#909191')}; */
    color: ${darken(0.2, '#909191')};
    fill: ${darken(0.2, '#909191')};
  }

  &.active {
    background: rgba(219, 68, 55, 0.1);
    border-color: rgba(219, 68, 55, 0.2);
    /* border-color: #db4437; */
    color: #db4437;
    fill: #db4437;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    height: 20px;
    width: 20px;
  }
`

export const Label = styled.strong`
  text-align: center;
  margin-left: 8px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 13px;
`

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 28px;
  margin-top: 4px;
`

export const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 80px;
`

export const DataLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
`

export const DataValue = styled.span`
  font-size: 11px;
`
