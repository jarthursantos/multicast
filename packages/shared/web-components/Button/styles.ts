import styled, { css } from 'styled-components'

export interface ButtonProps {
  flex?: boolean
}

export const Container = styled.button<ButtonProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 13px;
  font-weight: 500;
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  border-radius: 4px;

  transition: all 0.2s ease-in-out;

  & > .loader {
    position: absolute;
    height: 20px;
    width: 20px;

    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }

  ${({ flex: fill }) =>
    fill &&
    css`
      width: 100%;
    `}

  &.primary {
    background: ${({ theme }) =>
      theme.colors.button.primary.default.dark.background};
    color: ${({ theme }) =>
      theme.colors.button.primary.default.dark.foreground};

    :hover {
      background: ${({ theme }) =>
        theme.colors.button.primary.hover.dark.background};
      color: ${({ theme }) =>
        theme.colors.button.primary.hover.dark.foreground};
    }

    :focus {
      background: ${({ theme }) =>
        theme.colors.button.primary.focus.dark.background};
      color: ${({ theme }) =>
        theme.colors.button.primary.focus.dark.foreground};
    }

    :disabled {
      cursor: default;
      background: ${({ theme }) =>
        theme.colors.button.primary.disabled.dark.background};
      color: ${({ theme }) =>
        theme.colors.button.primary.disabled.dark.foreground};
    }
  }

  &.secondary {
    border: 2px solid #ddd;

    background: ${({ theme }) =>
      theme.colors.button.secondary.default.dark.background};
    color: ${({ theme }) =>
      theme.colors.button.secondary.default.dark.foreground};

    :hover {
      background: ${({ theme }) =>
        theme.colors.button.secondary.hover.dark.background};
      color: ${({ theme }) =>
        theme.colors.button.secondary.hover.dark.foreground};
    }

    :focus {
      background: ${({ theme }) =>
        theme.colors.button.secondary.focus.dark.background};
      color: ${({ theme }) =>
        theme.colors.button.secondary.focus.dark.foreground};
    }

    :disabled {
      cursor: default;
      background: ${({ theme }) =>
        theme.colors.button.secondary.disabled.dark.background};
      color: ${({ theme }) =>
        theme.colors.button.secondary.disabled.dark.foreground};
      border: 2px solid
        ${({ theme }) => theme.colors.button.secondary.disabled.dark.background};
    }
  }
`

interface LabelProps {
  invisible?: boolean
}

export const Label = styled.span<LabelProps>`
  ${({ invisible: hidden }) =>
    hidden &&
    css`
      opacity: 0;
    `}
`
