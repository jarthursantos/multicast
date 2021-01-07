import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  button {
    margin: 0 8px;
    height: 40px;
  }
`

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #999;
    font-size: 13px;
    margin-bottom: 4px;
  }

  &.code {
    width: 70px;

    input {
      text-align: center;
    }
  }

  &.name {
    flex: 1;
  }
`
