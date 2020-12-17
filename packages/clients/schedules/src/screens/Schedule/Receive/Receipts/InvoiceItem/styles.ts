import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: 2px solid #ddd;

  &.not-received {
    background: rgba(219, 68, 55, 0.1);
    border-color: #db4437;
  }

  &.received {
    background: rgba(47, 143, 55, 0.1);
    border-color: #2f8f37;
  }

  &.added {
    background: rgba(230, 183, 28, 0.1);
    border-color: #e6b71c;
  }
`

export const Container = styled.div`
  color: #666;
  transition: all 0.2s;

  padding: 16px;

  & > * + * {
    margin-top: 8px;
  }

  &.not-received {
    * {
      border-color: #db4437 !important;
      color: #db4437 !important;
    }
  }

  &.received {
    * {
      border-color: #2f8f37 !important;
      color: #2f8f37 !important;
    }
  }

  &.added {
    * {
      border-color: #e6b71c !important;
      color: #e6b71c !important;
    }
  }
`

export const Inline = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
    flex: 3;
  }
`

export const FillSpace = styled.div`
  flex: 1;
`

export const TicketIndicatorRight = styled.div`
  position: absolute;
  right: -2px;
  top: -9px;

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  border-left: 2px solid #ddd;

  background: #fff;
  height: 16px;
  width: 8px;

  &.not-received {
    border-color: #db4437;
  }

  &.received {
    border-color: #2f8f37;
  }

  &.added {
    border-color: #e6b71c;
  }
`

export const TicketIndicatorLeft = styled.div`
  position: absolute;
  left: -14px;
  top: -9px;

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  border-right: 2px solid #ddd;

  background: #fff;
  height: 16px;
  width: 8px;

  &.not-received {
    border-color: #db4437;
  }

  &.received {
    border-color: #2f8f37;
  }

  &.added {
    border-color: #e6b71c;
  }
`

export const Actions = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;

  padding: 12px 16px;
  border-top: 2px dashed #ddd;
  transition: all 0.2s;

  .inputs {
    width: 150px;
  }

  &.not-received {
    border-color: #db4437;

    .inputs {
      * {
        border-color: #db4437 !important;
      }

      label {
        color: #db4437 !important;
      }

      span :not(.error) {
        color: #db4437 !important;
      }
    }
  }

  &.received {
    border-color: #2f8f37;

    .inputs:not(.error) {
      * {
        border-color: #2f8f37 !important;
      }

      label {
        color: #2f8f37 !important;
      }

      span :not(.error) {
        color: #2f8f37 !important;
      }
    }
  }

  &.added {
    border-color: #e6b71c;

    .inputs:not(.error) {
      * {
        border-color: #e6b71c !important;
      }

      label {
        color: #e6b71c !important;
      }

      span :not(.error) {
        color: #e6b71c !important;
      }
    }
  }

  & > * + * {
    margin-left: 12px;
  }
`

export const IconButton = styled.button.attrs({
  type: 'button'
})`
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: 2px solid #ddd;
  border-radius: 4px;
  padding: 4px;
  transition: all 0.2s;
  color: #999;
  height: 36px;

  svg {
    height: 24px;
    width: 24px;
  }

  strong {
    margin: 0 4px;
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
  }

  :hover {
    background: rgba(102, 102, 102, 0.1);
    border: 2px solid #666;
    color: #666;
  }

  &.active {
    cursor: default;
  }

  &.negative.active,
  &.negative:hover {
    background: rgba(219, 68, 55, 0.1);
    border-color: #db4437;
    color: #db4437;
  }

  &.positive.active,
  &.positive:hover {
    background: rgba(47, 143, 55, 0.1);
    border: 2px solid #2f8f37;
    color: #2f8f37;
  }
`

export const HiddenFields = styled.div`
  display: none;
`
