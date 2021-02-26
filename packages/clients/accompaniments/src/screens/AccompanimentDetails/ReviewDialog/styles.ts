import styled from 'styled-components'

interface ContainerProps {
  visible?: boolean
}

export const Container = styled.div<ContainerProps>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #fff;

  height: 100vh;
  width: 100vw;
`
