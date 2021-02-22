import styled from 'styled-components'

export const Wrapper = styled.div`
  display: grid;

  grid-template-columns: 350px calc(100vw - 350px);
  grid-template-rows: 100vh;
  grid-template-areas: 'FORM CHART';

  form {
    grid-area: FORM;
    padding: 16px;
    border-right: 1px solid ${({ theme }) => theme.colors.border.primary};
  }
`

export const Inline = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
  }
`

export const InlineFlexRight = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }

  & > * + * {
    flex: 2;
    margin-left: 12px;
  }
`

export const ChartWrapper = styled.div`
  position: relative;

  grid-area: CHART;
  padding: 16px;
`

export const LoadingWrapper = styled.div`
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.7);
`
