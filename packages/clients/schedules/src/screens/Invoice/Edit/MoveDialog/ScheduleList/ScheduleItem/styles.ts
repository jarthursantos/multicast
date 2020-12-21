import styled from 'styled-components'

export const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  color: #666;
  font-size: 14px;
  padding: 8px 12px;

  &.selected {
    background-color: rgba(219, 68, 55, 0.1);
    color: #db4437;
  }

  &:hover:not(.selected) {
    background-color: #f0f0f0;
    color: #333;
  }

  ul {
    padding: 4px 8px 0;
  }

  li {
    display: flex;
    flex-direction: row;
    font-size: 12px;

    .number {
      width: 40px;
    }
  }

  li + li {
    margin-top: 4px;
  }
`

export const ShippingNameLabel = styled.span`
  flex: 1;
  text-transform: uppercase;
`
