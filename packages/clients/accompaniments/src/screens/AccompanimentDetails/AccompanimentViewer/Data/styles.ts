import styled from 'styled-components'

export const Wrapper = styled.div`
  grid-area: DATA;

  background-color: #f0f0f0;
`

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-right: 1px solid ${({ theme }) => theme.colors.border.primary};

  background-color: #fff;
  padding: 16px;
  margin: auto;
  height: calc(100vh - 52px);
  width: 100%;
  max-width: 400px;

  & > * + * {
    margin-top: 8px;
  }

  @media (max-width: 1100px) {
    border: none;
  }
`
