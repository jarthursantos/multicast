import styled from 'styled-components'

interface ContainerProps {
  productsWidth?: number
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${({ productsWidth }) =>
    `calc(100vw - ${productsWidth}px) ${productsWidth}px`};
  grid-template-rows: calc(100vh - 30px - 125px);
  grid-template-areas: 'TABLE PRODUCTS';
`

export const TableWrapper = styled.div`
  grid-area: TABLE;
  display: flex;

  & > * {
    width: 100%;
  }
`

export const IncludeMessageContainer = styled.div`
  position: absolute;

  top: 155px;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.text.primary.dark};

  strong {
    font-weight: 500;
  }
`
