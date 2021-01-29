import styled from 'styled-components'

export const Wrapper = styled.div`
  min-width: 300px;

  overflow-y: hidden;
  min-height: 100%;
  flex: 1;
  border-right: 1px solid ${({ theme }) => theme.colors.border.secondary};
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
