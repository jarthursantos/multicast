import React, { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'

import { formatPrice } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'
import { DateInput, NumberInput, TextInput } from '@shared/web-components/Form'

import { ColorIndicator } from '~/components/ColorIndicator'

import { Container, Inline, InlineWithLargeField } from '../styles'
import { DataWrapper, ChartWrapper, DataContainer, DataTuple } from './styles'
import { RequestDataProps } from './types'

const colors = ['#f94144', '#f3722c']

function buildOptions() {
  return {
    title: {
      display: false
    },
    tooltips: { enabled: false },
    legend: { display: false },
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: '#fff',
        position: 'border',
        arc: false,
        precision: 0
      }
    }
  }
}

const RequestData: React.VFC<RequestDataProps> = ({
  amountValue,
  deliveredValue
}) => {
  const data = useMemo(
    () => ({
      labels: ['Red', 'Blue'],
      datasets: [
        {
          label: 'Teste',
          data: [deliveredValue, amountValue - deliveredValue],
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }
      ]
    }),
    [amountValue, deliveredValue]
  )

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

      <DataWrapper>
        <ChartWrapper>
          <Pie height={100} width={100} data={data} options={buildOptions()} />
        </ChartWrapper>

        <DataContainer>
          <DataTuple>
            <strong>Total</strong>

            <span>{formatPrice(amountValue)}</span>
          </DataTuple>

          <DataTuple>
            <ColorIndicator color={colors[0]} size={12} />
            <strong>Entregue</strong>

            <span>{formatPrice(deliveredValue)}</span>
          </DataTuple>

          <DataTuple>
            <ColorIndicator color={colors[1]} size={12} />
            <strong>Pendente</strong>

            <span>{formatPrice(amountValue - deliveredValue)}</span>
          </DataTuple>
        </DataContainer>
      </DataWrapper>
    </Container>
  )
}

export default RequestData
