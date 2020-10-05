import 'chart.js'
import 'chartjs-plugin-labels'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'

import { DateInput, NumberInput, TextInput } from '@shared/web-components/Form'

import ColorIndicator from '~/components/ColorIndicator'

import { Container, Inline, InlineWithLargeField } from '../styles'
import {
  ValuesContainer,
  DataWrapper,
  ChartWrapper,
  DataContainer,
  DataTuple
} from './styles'

const colors = ['#f94144', '#f3722c']

const data = {
  labels: ['Red', 'Blue'],
  datasets: [
    {
      label: 'Teste',
      data: [11, 5],
      backgroundColor: colors,
      hoverBackgroundColor: colors
    }
  ]
}

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
        arc: true,
        precision: 0
      }
    }
  }
}

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

      <ValuesContainer>
        <h3>Valores</h3>

        <DataWrapper>
          <ChartWrapper>
            <Doughnut
              height={100}
              width={100}
              data={data}
              options={buildOptions()}
            />
          </ChartWrapper>

          <DataContainer>
            <DataTuple>
              <strong>Total</strong>

              <span>R$ 1.000.000,00</span>
            </DataTuple>

            <DataTuple>
              <ColorIndicator color={colors[0]} />
              <strong>Entregue</strong>

              <span>R$ 500.000,00</span>
            </DataTuple>

            <DataTuple>
              <ColorIndicator color={colors[1]} />
              <strong>Pendente</strong>

              <span>R$ 500.000,00</span>
            </DataTuple>
          </DataContainer>
        </DataWrapper>
      </ValuesContainer>
    </Container>
  )
}

export default RequestData
