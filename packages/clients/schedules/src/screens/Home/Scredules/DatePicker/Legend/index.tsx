import React from 'react'
import { MdFiberManualRecord, MdStar, MdPanoramaFishEye } from 'react-icons/md'

import { Container } from './styles'

const Legend: React.FC = () => (
  <Container>
    <li>
      <MdPanoramaFishEye />
      Pŕe Agendamento
    </li>

    <li>
      <MdStar />
      Agendamento Prioritário
    </li>

    <li>
      <MdFiberManualRecord />
      Agendamento Confirmado
    </li>
  </Container>
)

export default Legend
