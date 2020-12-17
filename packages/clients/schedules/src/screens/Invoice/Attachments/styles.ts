import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 700px;
`

export const Container = styled.div`
  flex: 1;
`

export const TabBar = styled.div`
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border.primary};
  height: 40px;
`

interface TabContainerProps {
  visible: boolean
}

export const TabContainer = styled.div<TabContainerProps>`
  height: 100%;

  ${({ visible }) =>
    !visible &&
    css`
      display: none;
    `}
`

interface TabButtonProps {
  active: boolean
}

export const TabButton = styled.button<TabButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  background: none;
  height: 100%;
  padding: 0 16px;

  border-top: 2px solid #fff;
  border-bottom: 2px solid
    ${({ active, theme }) => (active ? theme.colors.primary.light : '#fff')};
  color: ${({ active, theme }) =>
    active ? theme.colors.text.primary.dark : theme.colors.text.secondary.dark};
`
