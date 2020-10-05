import styled from 'styled-components'

export const Wrapper = styled.div`
  border-radius: 4px;
  padding: 8px 12px;
  border: 2px solid #ddd;
`

export const Content = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  font-size: 14px;
  text-align: justify;
`

export const CreationData = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 13px;
  margin-top: 8px;
`

export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.text.primary.dark};
`

export const CreatedAt = styled.small`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
`
