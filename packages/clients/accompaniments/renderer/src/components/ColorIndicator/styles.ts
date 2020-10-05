import styled from 'styled-components'

export interface ConteinerProps {
  color: string
}

export const Container = styled.div<ContainerProps>`
  background: ${({ color }) => color};
  border-radius: 8px;
  height: 16px;
  width: 16px;
`
