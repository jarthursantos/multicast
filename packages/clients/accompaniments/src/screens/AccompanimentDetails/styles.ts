import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  display: flex;

  padding: 8px;
  padding-bottom: 0;
  padding-right: 0;

  form {
    display: flex;

    & > * {
      margin: 0;
      padding: 8px;
      width: 374px;
    }
  }
`
