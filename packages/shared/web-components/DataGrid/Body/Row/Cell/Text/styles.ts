import styled, { css } from 'styled-components'

import { Aligns } from '../../../../types'

export interface ContainerProps {
  align?: Aligns
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ align }) => {
    switch (align) {
      case 'center':
        return css`
          justify-content: center;
        `
      case 'left':
        return css`
          justify-content: flex-start;
        `
      case 'right':
        return css`
          justify-content: flex-end;
        `
    }
  }}
`
