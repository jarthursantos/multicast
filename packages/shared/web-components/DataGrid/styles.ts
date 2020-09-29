import ScrollBar from 'react-perfect-scrollbar'

import styled, { css } from 'styled-components'

import { HeaderCellProps } from './Header/Cell/types'

interface Props {
  columns: HeaderCellProps[]
}

export const Wrapper = styled.div<Props>`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40px 1px calc(100% - 82px) 1px 40px;
  grid-template-areas:
    'DGHEADER'
    'DGTOPSEPARATOR'
    'DGBODY'
    'DGBOTTOMSEPARATOR'
    'DGFOOTER';

  height: 100%;
  width: 100%;

  ${({ columns }) => {
    return columns.map(
      ({ width }, index) => css`
        .col-${index} {
          width: ${width}px;
        }
      `
    )
  }}
`

export const TopSeparator = styled.div`
  grid-area: DGTOPSEPARATOR;

  background: ${({ theme }) => theme.colors.border.primary};
`

export const BottomSeparator = styled.div`
  grid-area: DGBOTTOMSEPARATOR;

  background: ${({ theme }) => theme.colors.border.primary};
`

export const HeaderWrapper = styled(ScrollBar)`
  grid-area: DGHEADER;

  .ps__rail-x,
  .ps__rail-y {
    display: none;
  }
`

export const FooterWrapper = styled(ScrollBar)`
  grid-area: DGFOOTER;

  .ps__rail-x,
  .ps__rail-y {
    display: none;
  }
`

export const BodyWrapper = styled(ScrollBar)`
  grid-area: DGBODY;
`
