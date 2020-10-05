import styled from 'styled-components'

export const Backdrop = styled.div`
  position: absolute;
  top: 150px;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.text.primary.dark};
`

export default Backdrop
