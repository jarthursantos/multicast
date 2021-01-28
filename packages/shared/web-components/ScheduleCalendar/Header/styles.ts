import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 8px 16px 0;
`

export const Title = styled.h1`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-weight: 500;
  flex: 1;
  text-align: center;
`

export const Button = styled.button`
  background: none;
  border: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.text.caption.dark};
  height: 40px;
  width: 40px;

  :hover {
    background: #f0f0f0;
    color: ${({ theme }) => theme.colors.text.secondary.dark};
  }
`
