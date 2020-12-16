import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  border-radius: 4px;
  background: #fff;
`

export const TopIndicator = styled.div`
  align-self: flex-end;

  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #fff;

  margin-right: 14px;
  width: 0;
  height: 0;
`

export const BottomIndicator = styled.div`
  align-self: flex-end;

  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;

  margin-right: 14px;
  width: 0;
  height: 0;
`
