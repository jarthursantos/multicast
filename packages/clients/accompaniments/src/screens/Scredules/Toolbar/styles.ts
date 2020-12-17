import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  z-index: 5;
  height: 64px;

  form {
    width: 300px;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  flex: 1;

  & > * + * {
    margin-left: 8px;
  }
`

export const CurrentDate = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary.dark};
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  color: #888;
  height: 32px;
  width: 32px;
  transition: all 0.2s ease-in-out;

  :hover {
    color: #333;
  }
`
