import { ResizableBox } from 'react-resizable'

import styled from 'styled-components'

export const Wrapper = styled(ResizableBox).attrs({
  resizeHandles: ['w'],
  axis: 'x'
})`
  height: 100%;
  padding-left: 8px;
  border-left: 1px solid ${props => props.theme.colors.border.primary};
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 88px calc(100vh - 88px - 30px - 125px);
  grid-template-areas:
    'HEADER'
    'CONTENT';

  height: 100%;
`

export const Header = styled.div`
  grid-area: HEADER;
  padding: 12px;
  border-bottom: 1px solid ${props => props.theme.colors.border.primary};

  label {
    margin-bottom: 8px;
  }
`

export const LoadingWrapper = styled.div`
  grid-area: CONTENT;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.8);
  color: ${({ theme }) => theme.colors.text.primary.dark};
`
