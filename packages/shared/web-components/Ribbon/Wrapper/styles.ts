import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 30px 125px calc(100vh - 125px - 30px);
  grid-template-areas:
    'TABBAR'
    'TABOPTIONS'
    'CONTENT';

  height: 100vh;
`
