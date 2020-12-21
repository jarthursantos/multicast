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

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px 8px;

  h2 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  h3 {
    cursor: pointer;

    color: ${({ theme }) => theme.colors.text.secondary.dark};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;

    align-self: flex-start;

    padding: 2px 4px;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #aaa;
      color: #fff;
    }
  }
`
