import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
`

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;

  height: 48px;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};

  & > * + * {
    margin-left: 8px;
  }
`

export const Title = styled.strong`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary.dark};
`
