import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  position: relative;

  background: #fff;
  border-radius: 4px;
  width: 450px;

  h2 {
    color: ${({ theme }) => theme.colors.text.primary.dark};
    font-size: 18px;
    font-weight: 500;
    margin-top: 16px;
    margin-left: 16px;
  }
`

export const FieldsContainer = styled.div`
  padding: 16px;
  padding-top: 8px;

  h3 {
    color: ${({ theme }) => theme.colors.text.secondary.dark};
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  & > div + h3 {
    margin-top: 8px;
  }
`

export const Indicator = styled.div`
  align-self: flex-start;

  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;

  margin-left: 32px;
  width: 0;
  height: 0;
`

export const CloseButton = styled.button`
  position: absolute;

  right: 0;
  top: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: none;
  color: #999;
  height: 40px;
  width: 40px;

  transition: all 0.2s ease-in-out;

  :hover {
    color: #666;
  }
`

export const Inline = styled.div`
  display: flex;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
  }
`

export const InlineWithName = styled.div`
  display: flex;

  & > * {
    width: 80px;
  }

  & > * + * {
    flex: 1;
    margin-left: 12px;
  }
`
