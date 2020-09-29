import styled, { css } from 'styled-components'

import { Aligns } from '../../types'

interface Props {
  align?: Aligns
}

export const Container = styled.div<Props>`
  position: relative;

  display: inline-block;
  vertical-align: bottom;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-right: 1px solid ${({ theme }) => theme.colors.border.primary};
  text-transform: uppercase;

  font-size: 12px;

  text-align: center;
  font-weight: 500;
  padding: 12px 8px;

  height: 100%;
  color: ${({ theme }) => theme.colors.text.secondary.dark};

  ${({ align }) => {
    switch (align) {
      case 'center':
        return css`
          text-align: center;
        `
      case 'left':
        return css`
          text-align: left;
        `
      case 'right':
        return css`
          text-align: right;
        `
    }
  }}
`
