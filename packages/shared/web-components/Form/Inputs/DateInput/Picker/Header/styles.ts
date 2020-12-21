import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 8px 16px 0;
`

export const Title = styled.h1`
  font-size: 12px;
  color: #666;
  font-weight: 500;
  flex: 1;
  text-align: center;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  border-radius: 20px;
  color: #999;
  height: 32px;
  width: 32px;

  :hover {
    background: #f0f0f0;
    color: #666;
  }
`
