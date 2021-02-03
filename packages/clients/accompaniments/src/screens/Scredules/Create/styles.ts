import styled from 'styled-components'

import { Form } from '@shared/web-components/Form'

export const Wrapper = styled(Form)`
  display: flex;
  flex-direction: column;

  height: 100%;
`

export const Container = styled.div`
  padding: 16px;
  flex: 1;

  margin: 0;
  & > * + * {
    margin-top: 8px;
  }
`

export const HourPickerWrapper = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
  }
`

export const DurationIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  color: #333;
  margin-top: 16px;
  font-size: 14px;

  border: 2px solid;
  border-color: #ccc;
  background: #f0f0f0;

  &.valid {
    border-color: #2f8f37;
    background: rgba(47, 143, 55, 0.1);
  }

  &.invalid {
    background: rgba(230, 183, 28, 0.1);
    border-color: #e6b71c;
  }
`

export const DurationIndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;

  strong {
    font-weight: 500;
  }
`

export const DurationIndicatorSituation = styled.div`
  border-top: 1px dotted;
  border-color: inherit;
  padding: 8px 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
`
