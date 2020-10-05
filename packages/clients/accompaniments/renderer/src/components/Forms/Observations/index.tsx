import React from 'react'

import { Button } from '@shared/web-components'

import { Container } from '../styles'
import Observation from './Observation'
import { ScrollBar, Content } from './styles'

const Observations: React.FC = () => {
  return (
    <Container>
      <h3>Obervações</h3>

      <ScrollBar>
        <Content>
          <Observation
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquid quia veniam sed, deleniti vel magni nobis, ratione enim hic officiis velit veritatis animi suscipit voluptates voluptatem, optio fugiat corrupti?"
            createdAt={new Date()}
            createdBy={{ name: 'Arthur Santos' }}
          />
        </Content>
      </ScrollBar>

      <Button label="Adicionar Observação" />
    </Container>
  )
}

export default Observations
