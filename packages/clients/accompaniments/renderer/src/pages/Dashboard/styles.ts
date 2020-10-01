import ScrollBar from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Wrapper = styled(ScrollBar)`
  position: relative;

  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: auto;
  grid-template-areas: 'CONTENT FILTERS';

  height: 100%;
  width: 100%;
`

export const Container = styled.div`
  grid-area: CONTENT;

  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1;
`

export const Content = styled.div`
  width: 100%;
  max-width: 1020px;
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;

  h2 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  h3 {
    color: ${({ theme }) => theme.colors.text.secondary.dark};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
  }
`

export const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const ChartWrapper = styled.div`
  width: 250px;
  height: 250px;
`

export const ChartsLegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 32px;

  & > * + * {
    margin-left: 16px;
  }
`

export const ChartLegend = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  strong {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.text.secondary.dark};
    margin-left: 8px;
  }
`

export const ColorIndicator = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  border-radius: 8px;
  height: 16px;
  width: 16px;
`
