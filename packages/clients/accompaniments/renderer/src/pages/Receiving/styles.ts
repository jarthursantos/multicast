import ScrollBar from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 88px calc(100vh - 88px - 33px - 120px);
  grid-template-areas:
    'HEADER PRODUCTS'
    'CONTENT PRODUCTS';
`

export const Header = styled(ScrollBar)`
  grid-area: HEADER;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};

  display: flex;
  align-items: center;
  padding: 0 16px;

  & > * {
    padding-right: 16px;
  }
`

export const Container = styled.div`
  grid-area: CONTENT;
  display: flex;

  & > * {
    width: 100%;
  }
`

export const ProductsWrapper = styled.div`
  grid-area: PRODUCTS;
`
