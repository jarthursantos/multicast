import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;

  background: none;
  border: none;
  color: #666;
  padding: 0;
  transition: all 0.2s;

  svg {
    height: 24px;
    width: 24px;
  }

  :focus {
    color: #333;

    svg {
      height: 24px;
      width: 24px;
    }
  }
`

export const Label = styled.span`
  margin-left: 8px;
  font-size: 12px;
  line-height: 24px;
`
