import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;

  grid-template-columns: 350px calc(100vw - 350px);
  grid-template-rows: 100vh;
  grid-template-areas: 'SIDE_PANEL ACCOMPANIMENT_VIEWER';

  height: 100vh;
  width: 100vw;

  h3 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-size: 14px;
    font-weight: 500;
  }
`
