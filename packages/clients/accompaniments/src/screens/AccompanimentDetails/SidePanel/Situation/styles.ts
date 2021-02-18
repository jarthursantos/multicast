import styled from 'styled-components'

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex: 1;
  margin-left: 16px;

  & > * + * {
    margin-top: 8px;
  }
`

export const DataTuple = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;

  & > div {
    margin-right: 8px;
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-weight: 500;
  }

  span {
    color: ${({ theme }) => theme.colors.text.secondary.dark};
    flex: 1;
    text-align: right;
  }
`

export const DataWrapper = styled.div`
  grid-area: SITUATION;

  display: flex;
  align-items: center;

  padding: 16px;
  margin: 16px;

  border: 2px dashed #ccc !important;
  background: #f0f0f0;
  border-radius: 4px;
  flex: 1;
`

export const ChartWrapper = styled.div`
  height: 90px;
  width: 90px;
`
