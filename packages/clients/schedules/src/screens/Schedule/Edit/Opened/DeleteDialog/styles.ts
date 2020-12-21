import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;
  height: 120px;
  width: 400px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;

  h1 {
    color: #333;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid #bbb;
  padding: 12px 16px;
  margin: 0;
`
