import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  height: 120px;
  width: 320px;

  h2 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    flex: 1;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;

  & > * + * {
    margin-left: 8px;
  }
`
