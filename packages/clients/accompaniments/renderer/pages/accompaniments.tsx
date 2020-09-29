import React from 'react'

import Head from 'next/head'
import styled from 'styled-components'

import { Form, TextInput, NumberInput } from '@shared/web-components/Form'

const Next = () => {
  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Acompanhamento</title>
      </Head>

      <Wrapper>
        <Form onSubmit={console.log}>
          <Container>
            <div>
              <h3>Dados do Pedido</h3>

              <Inline>
                <NumberInput name="number" label="Nº Pedido" />
                <TextInput name="emittedAt" label="Emissão" />
              </Inline>

              <Inline>
                <NumberInput name="provider.code" label="Cód. Fornec." />
                <TextInput name="provider.name" label="Fornecedor" />
              </Inline>

              <TextInput name="buyer.name" label="Comprador" />

              <Inline>
                <NumberInput name="amountValue" label="Valor Total" />
                <NumberInput name="deliveredValue" label="Valor Entregue" />
                <NumberInput name="pendingValue" label="Valor Pendente" />
              </Inline>

              <Inline>
                <TextInput name="freight" label="Frete" />
                <TextInput name="shippingName" label="Transportadora" />
              </Inline>
            </div>

            <div>
              <h3>Dados do Andamento</h3>

              <TextInput name="emittedAt" label="Liberação para Faturamento" />

              <TextInput name="emittedAt" label="Previsão do Faturamento" />

              <TextInput name="emittedAt" label="Arquivo XML / Faturamento" />

              <Inline>
                <NumberInput name="provider.code" label="Nº Nota Fiscal" />
                <TextInput name="provider.name" label="Valor Nota Fiscal" />
              </Inline>

              <TextInput name="emittedAt" label="FOB SP" />

              <TextInput name="emittedAt" label="Previsão do Agendamento" />
            </div>

            <div>
              <h3>Observações</h3>

              <TextInput name="shippingName" label="Transportadora" />
            </div>
          </Container>
        </Form>
      </Wrapper>
    </React.Fragment>
  )
}

const Wrapper = styled.div``

const Container = styled.div`
  display: flex;

  & > * {
    width: 350px;
  }

  & > * + * {
    border-left: 1px solid #bbb;
  }

  & > div {
    padding: 16px;

    & > * + * {
      margin-top: 12px;
    }
  }
`

const Inline = styled.div`
  display: flex;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-left: 12px;
  }
`

export default Next
