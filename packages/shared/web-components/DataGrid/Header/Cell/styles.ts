import styled, { css } from 'styled-components'

import { Aligns } from '../../types'

interface Props {
  align?: Aligns
}

export const Container = styled.div<Props>`
  cursor: pointer;
  position: relative;

  display: inline-block;
  vertical-align: bottom;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-right: 1px solid ${({ theme }) => theme.colors.border.primary};
  text-transform: uppercase;

  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  padding: 12px 8px;

  height: 100%;
  color: ${({ theme }) => theme.colors.text.secondary.dark};

  .indicator {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.7077205882352942) 20%,
      rgba(255, 255, 255, 1) 100%
    );
  }

  :hover {
    background: #f0f0f0;

    .indicator {
      background: linear-gradient(
        90deg,
        rgba(240, 240, 240, 0) 0%,
        rgba(240, 240, 240, 0.7077205882352942) 20%,
        rgba(240, 240, 240, 1) 100%
      );
    }
  }

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

export const OrderIndicatorContainer = styled.div.attrs({
  className: 'indicator'
})`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  right: 6px;
  bottom: 0;
`
