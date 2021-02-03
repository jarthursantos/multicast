import styled, { css } from 'styled-components'

interface WrapperProps {
  fill?: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  overflow-y: hidden;
  min-height: 100%;
  flex: 1;
  border-right: 1px solid ${({ theme }) => theme.colors.border.secondary};

  ${({ fill }) =>
    !fill &&
    css`
      min-width: 300px;
      max-width: 500px;
    `}
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 40px);
  position: relative;

  & > * {
    border-bottom: 1px dashed ${({ theme }) => theme.colors.border.secondary};
  }
`
