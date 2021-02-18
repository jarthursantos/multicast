import styled from 'styled-components'

export const Wrapper = styled.div`
  cursor: pointer;

  display: flex;
  flex-direction: column;

  border: 2px solid #ddd;
  border-radius: 4px;
  color: #333;
  padding: 8px 12px;

  font-size: 13px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 8px;
`

export const Title = styled.strong`
  font-weight: 500;
`

export const Value = styled.span``

export const SituationWrapper = styled.div`
  border-radius: 4px;
  background-color: #eee;
  border-left: 4px solid #ccc;
  padding: 4px 8px;
  font-size: 12px;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
`
