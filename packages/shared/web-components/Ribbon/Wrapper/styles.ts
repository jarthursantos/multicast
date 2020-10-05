import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: 30px 120px calc(100vh - 120px - 30px);
  grid-template-areas:
    'TABBAR'
    'TABOPTIONS'
    'CONTENT';

  height: 100vh;
`
