import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  min-height: 100%;

  flex: 1;

  & > * {
    border-top: 1px dashed ${({ theme }) => theme.colors.border.secondary};
  }
`
