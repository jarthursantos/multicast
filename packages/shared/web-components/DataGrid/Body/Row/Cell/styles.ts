import styled from 'styled-components'

export const Container = styled.div`
  display: inline-block;
  vertical-align: bottom;

  text-decoration: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  border-right: 1px solid ${({ theme }) => theme.colors.border.secondary};
  text-transform: uppercase;

  padding: 6px 8px;
  font-size: 12px;
  line-height: 16px;
  height: 27px;
`
