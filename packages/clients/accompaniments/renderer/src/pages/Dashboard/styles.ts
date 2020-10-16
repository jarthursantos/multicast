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
  padding-bottom: 24px;
`

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px 32px 8px;

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
  flex: 1;
  width: 330px;
  height: 330px;
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

export const TimelineLegendContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const TimelineLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const TimelineLegend = styled.div`
  background: rgb(222, 33, 33);
  background: linear-gradient(
    90deg,
    rgba(222, 33, 33, 1) 0%,
    rgba(237, 206, 26, 1) 50%,
    rgba(28, 218, 120, 1) 100%
  );
  height: 8px;
  border-radius: 4px;
`

export const TimelineLabelContainer = styled.div`
  display: flex;
  flex-direction: column;

  &.danger {
    align-items: flex-start;

    &::after {
      border-bottom-color: rgb(222, 33, 33);
      margin-left: 8px;
    }
  }

  &.warning {
    align-items: center;

    &::after {
      border-bottom-color: rgba(237, 206, 26, 1);
    }
  }

  &.inDay {
    align-items: flex-end;

    &::after {
      border-bottom-color: rgba(28, 218, 120, 1);
      margin-right: 8px;
    }
  }

  &::after {
    content: '';
    margin-top: 2px;

    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid;

    width: 0;
    height: 0;
  }
`

export const TimelineLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 14px;
`

export const TimelineCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 4px;
  padding: 1px 4px;
`
