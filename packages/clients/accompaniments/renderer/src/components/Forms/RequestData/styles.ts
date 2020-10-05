import styled from 'styled-components'

export const ValuesContainer = styled.div`
  display: flex;
  flex-direction: column;

  border: 2px dashed #ccc;
  background: #f0f0f0;
  border-radius: 4px;
  padding: 12px;
  flex: 1;

  margin-top: 24px;
  h3 {
    font-size: 13px;
  }
`

export const ChartWrapper = styled.div`
  height: 110px;
  width: 110px;
`

export const DataWrapper = styled.div`
  display: flex;
  align-items: center;

  flex: 1;
  margin-top: 12px;
`

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
