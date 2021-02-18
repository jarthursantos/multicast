import React from 'react'

import { Button } from '@shared/web-components'

import { Data } from './Data'
import { Observations } from './Observations'
import { Container, Actions } from './styles'

const AccompanimentViewer: React.VFC = () => {
  return (
    <Container>
      <Data options={[]} disabled={false} isFreeOnBoard={false} />

      <Observations accompanimentId="" observations={[]} />

      <Actions>
        <Button label="Salvar" />
      </Actions>
    </Container>
  )
}

export { AccompanimentViewer }
