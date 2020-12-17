import styled from 'styled-components'

export const Container = styled.ul`
  padding: 12px 16px;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;

    color: ${({ theme }) => theme.colors.text.secondary.dark};
    font-size: 13px;

    svg {
      margin-right: 8px;
      height: 12px;
      width: 12px;
    }

    strong {
      font-weight: 500;
    }
  }

  & > li + li {
    margin-top: 4px;
  }
`
