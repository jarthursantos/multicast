import styled from 'styled-components'

export interface ContainerProps {
  color: string
  size?: number
}

export const Container = styled.div<ContainerProps>`
  background: ${({ color }) => color};
  border-radius: 8px;
  height: ${({ size }) => size || 16}px;
  width: ${({ size }) => size || 16}px;
`
