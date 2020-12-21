import React, { useContext } from 'react'
import { Pie } from 'react-chartjs-2'

import {
  Wrapper,
  ChartContainer
} from '~/screens/Accompaniments/GeneralResume/Representativity/Charts/styles'
import { RepresentativityContext } from '~/screens/Accompaniments/GeneralResume/Representativity/context'

export const colors = [
  '#f94144',
  '#f3722c',
  '#f8961e',
  '#f9844a',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#4d908e',
  '#577590',
  '#277da1'
]

function buildData(...values: number[]) {
  return {
    datasets: [
      {
        data: [...values],
        backgroundColor: colors,
        hoverBackgroundColor: colors
      }
    ]
  }
}

function buildOptions(title?: string) {
  return {
    title: {
      display: !!title,
      text: title || '',
      fontFamily: 'Roboto',
      fontSize: 14,
      padding: 16,
      fontStyle: '500'
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

const RepresentativityCharts: React.FC = () => {
  const { countData, amountData, deliveredData } = useContext(
    RepresentativityContext
  )

  return (
    <Wrapper>
      <ChartContainer>
        <Pie
          width={100}
          height={100}
          data={buildData(...countData)}
          options={buildOptions('Nº Pedidos (Qtd.)')}
        />
      </ChartContainer>

      <ChartContainer>
        <Pie
          width={100}
          height={100}
          data={buildData(...amountData)}
          options={buildOptions('Valor Total (R$)')}
        />
      </ChartContainer>

      <ChartContainer>
        <Pie
          width={100}
          height={100}
          data={buildData(...deliveredData)}
          options={buildOptions('Valor Entregue (R$)')}
        />
      </ChartContainer>
    </Wrapper>
  )
}

export { RepresentativityCharts }
