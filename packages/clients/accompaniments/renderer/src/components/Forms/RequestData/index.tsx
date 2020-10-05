import React from 'react'

import { DateInput, NumberInput, TextInput } from '@shared/web-components/Form'

import { Container, Inline, InlineWithLargeField } from '../styles'

const RequestData: React.FC = () => {
  return (
    <Container>
      <h3>Dados do Pedido</h3>

      <Inline>
        <NumberInput
          name="purchaseOrder.number"
          label="Nº Pedido"
          inputProps={{ readOnly: true }}
        />
        <DateInput
          name="purchaseOrder.emittedAt"
          label="Emissão"
          inputProps={{ readOnly: true }}
        />
      </Inline>

      <InlineWithLargeField>
        <TextInput
          name="purchaseOrder.provider.name"
          label="Fornecedor"
          inputProps={{ readOnly: true }}
        />
        <NumberInput
          name="purchaseOrder.provider.code"
          label="Código"
          inputProps={{ readOnly: true }}
        />
      </InlineWithLargeField>

      <Inline>
        <TextInput
          name="purchaseOrder.provider.fantasy"
          label="Fantasia"
          inputProps={{ readOnly: true }}
        />
        <TextInput
          name="purchaseOrder.provider.representative.name"
          label="Representante"
          inputProps={{ readOnly: true }}
        />
      </Inline>

      <InlineWithLargeField>
        <TextInput
          name="purchaseOrder.buyer.name"
          label="Comprador"
          inputProps={{ readOnly: true }}
        />
        <NumberInput
          name="purchaseOrder.buyer.code"
          label="Código"
          inputProps={{ readOnly: true }}
        />
      </InlineWithLargeField>

      <Inline>
        <NumberInput
          name="purchaseOrder.amountValue"
          label="Valor Total"
          inputProps={{ readOnly: true }}
        />
        <NumberInput
          name="purchaseOrder.deliveredValue"
          label="Valor Entregue"
          inputProps={{ readOnly: true }}
        />
        <NumberInput
          name="purchaseOrder.pendingValue"
          label="Valor Pendente"
          inputProps={{ readOnly: true }}
        />
      </Inline>

      <InlineWithLargeField>
        <TextInput
          name="purchaseOrder.shippingName"
          label="Transportadora"
          inputProps={{ readOnly: true }}
        />
        <TextInput
          name="purchaseOrder.freight"
          label="Frete"
          inputProps={{ readOnly: true }}
        />
      </InlineWithLargeField>
    </Container>
  )
}

export default RequestData
