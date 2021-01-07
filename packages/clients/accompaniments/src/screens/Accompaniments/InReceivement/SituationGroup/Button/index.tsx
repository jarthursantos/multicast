import React from 'react'

import { useActiveSituation } from '../../context'
import {
  Wrapper,
  Container,
  Label,
  DataWrapper,
  DataContainer,
  DataLabel,
  DataValue
} from './styles'
import { SituationGroupButtonProps } from './types'

const SituationGroupButton: React.FC<SituationGroupButtonProps> = ({
  icon,
  situation,
  label,
  accompanimentCount,
  delayCount
}) => {
  const [isActive, setActive] = useActiveSituation(situation)

  return (
    <Wrapper onClick={setActive} className={isActive && 'active'}>
      <Container>
        {icon}
        <Label>{label}</Label>
      </Container>

      <DataWrapper>
        <DataContainer>
          <DataLabel>Total</DataLabel>
          <DataValue>{accompanimentCount}</DataValue>
        </DataContainer>

        <DataContainer>
          <DataLabel>Atrasados</DataLabel>
          <DataValue>{delayCount}</DataValue>
        </DataContainer>
      </DataWrapper>
    </Wrapper>
  )
}

export { SituationGroupButton }
