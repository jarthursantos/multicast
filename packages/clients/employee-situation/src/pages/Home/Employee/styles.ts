import styled from 'styled-components'

export const Container = styled.div`
  padding: 8px 12px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.border.secondary};

  & > * + * {
    margin-top: 4px;
  }
`

export const PersonalData = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
`

export const Name = styled.strong`
  user-select: text;
  flex: 1;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.primary.dark};
`

export const Code = styled.div`
  user-select: text;
  color: ${({ theme }) => theme.colors.text.secondary.dark};
`

export const SituationData = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;

  & > * + * {
    margin-left: 8px;
  }
`

export const Situation = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary.dark};
  flex: 1;
`

export const Chip = styled.div`
  background: ${({ theme }) => theme.colors.text.primary.dark};
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.text.primary.light};
  padding: 2px 4px;
`
