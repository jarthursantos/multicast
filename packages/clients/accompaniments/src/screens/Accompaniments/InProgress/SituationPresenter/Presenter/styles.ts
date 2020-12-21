import styled from 'styled-components'

export const Wrapper = styled.div`
  grid-area: CONTENT;
`

interface ContainerProps {
  productsWidth?: number
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: ${({ productsWidth }) =>
    `calc(100vw - ${productsWidth}px) ${productsWidth}px`};
  grid-template-rows: calc(100vh - 88px - 30px - 125px);
  grid-template-areas: 'TABLE PRODUCTS';
`

export const TableWrapper = styled.div`
  grid-area: TABLE;
  display: flex;

  & > * {
    width: 100%;
  }
`
