import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  width: 400px;
  padding-top: 16px;
`

export const Container = styled.div`
  padding: 12px 16px 8px;
`

export const Message = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 13px;
  margin-top: 0;
  margin-bottom: 16px;
  margin-left: 16px;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary.dark};
  font-size: 16px;
  font-weight: 500;
  margin-left: 16px;
`
