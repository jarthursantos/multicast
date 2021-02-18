import React, { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'

import { formatPrice } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { ColorIndicator } from '~/components/ColorIndicator'

import { DataContainer, DataTuple, ChartWrapper, DataWrapper } from './styles'

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

const Situation: React.FC = () => {
  const deliveredValue = 10000
  const amountValue = 41111

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
  )
}

export { Situation }
