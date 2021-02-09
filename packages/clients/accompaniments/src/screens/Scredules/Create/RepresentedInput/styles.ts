import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

interface ContainerProps {
  disabled?: boolean
}

export const Container = styled.div<ContainerProps>`
  border-radius: 4px;
  border: 2px solid #ccc;
  padding: 0 4px;
  overflow-y: scroll;
  height: 170px;

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #f0f0f0;
    `}

  & > * + * {
    border-top: 1px dashed #ccc;
  }
`

export const InputLabel = styled.label`
  color: #666;
  font-size: 13px;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
