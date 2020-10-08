import ScrollBar from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Wrapper = styled(ScrollBar)`
  height: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  height: 100%;

  & > * + * {
    margin-left: 8px;
  }
`

export const Separator = styled.div`
  height: 80px;
  width: 1px;
  background: ${({ theme }) => theme.colors.border.secondary} !important;
  margin-left: 12px !important;
  margin-right: 4px;
`
