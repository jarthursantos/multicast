import { lighten } from 'polished'
import styled, { css } from 'styled-components'

interface Props {
  selectedRow?: string
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;

  ${({ selectedRow }) =>
    selectedRow &&
    css`
      .row-${selectedRow} {
        background: ${lighten(0.1, '#db4437')};
        color: #fff;
      }
    `}
`
