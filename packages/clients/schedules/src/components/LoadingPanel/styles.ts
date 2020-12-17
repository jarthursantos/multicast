import styled from 'styled-components'

export interface IContainerProps {
  isLoading?: boolean
}

export const Container = styled.div<IContainerProps>`
  position: fixed;

  display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.8);
  top: 155px;
  bottom: 0;
  left: 0;
  right: 0;
`
