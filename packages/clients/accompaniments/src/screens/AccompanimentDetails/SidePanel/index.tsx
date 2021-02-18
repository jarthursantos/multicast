import React from 'react'

import { Form } from '@shared/web-components'

import { InvoicePicker } from './InvoicePicker'
import { RequestData } from './RequestData'
import { Situation } from './Situation'
import { Container } from './styles'

const SidePanel: React.FC = () => {
  return (
    <Form onSubmit={console.log}>
      <Container>
        <RequestData />

        <InvoicePicker />

        <Situation />
      </Container>
    </Form>
  )
}

export { SidePanel }
