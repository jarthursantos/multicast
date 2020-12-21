import ScrollBar from 'react-perfect-scrollbar'

import styled from 'styled-components'

export const Wrapper = styled(ScrollBar)`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;

  height: 100%;
  width: 100%;
`

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
`
