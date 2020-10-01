import 'chart.js'
import 'chartjs-plugin-labels'

import React from 'react'
import { Pie } from 'react-chartjs-2'

import FilterSituations from './FilterSituations'
import {
  Wrapper,
  Container,
  Content,
  Section,
  ChartsContainer,
  ChartWrapper,
  ChartsLegendContainer,
  ChartLegend,
  ColorIndicator
} from './styles'
import Timeline from './Timeline'

const colors = [
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

const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow',
    'Red',
    'Blue',
    'Yellow',
    'Red',
    'Blue',
    'Yellow',
    'Black'
  ],
  datasets: [
    {
      label: 'Teste',
      data: [180, 50, 100],
      backgroundColor: colors,
      hoverBackgroundColor: colors
    }
  ]
}

function buildOptions(title: string) {
  return {
    title: {
      display: true,
      text: title,
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
        arc: true,
        precision: 0
      }
    }
  }
}

const Dashboard: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <Section>
            <h2>Representatividade</h2>

            <ChartsContainer>
              <ChartWrapper>
                <Pie
                  height={100}
                  width={100}
                  data={data}
                  options={buildOptions('Nº Pedidos')}
                />
              </ChartWrapper>

              <ChartWrapper>
                <Pie
                  height={100}
                  width={100}
                  data={data}
                  options={buildOptions('Valor Total')}
                />
              </ChartWrapper>

              <ChartWrapper>
                <Pie
                  height={100}
                  width={100}
                  data={data}
                  options={buildOptions('Valor Entregue')}
                />
              </ChartWrapper>

              <ChartWrapper>
                <Pie
                  height={100}
                  width={100}
                  data={data}
                  options={buildOptions('Valor Pendente')}
                />
              </ChartWrapper>
            </ChartsContainer>

            <ChartsLegendContainer>
              <ChartLegend>
                <ColorIndicator color={colors[0]} />
                <strong>Novos Pedidos</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[1]} />
                <strong>Em Andamento</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[2]} />
                <strong>Em Recebimento</strong>
              </ChartLegend>
            </ChartsLegendContainer>
          </Section>

          <Section>
            <h2>Timeline</h2>

            <h3>Última atualização no acompanhamento em 15/09/2020</h3>

            <Timeline />
          </Section>

          <Section>
            <h3>Última atualização no acompanhamento em 20/09/2020</h3>

            <Timeline />
          </Section>

          <Section>
            <h3>Última atualização no acompanhamento em 25/09/2020</h3>

            <Timeline />
          </Section>

          <Section>
            <h3>Última atualização no acompanhamento em 30/09/2020</h3>

            <Timeline />
          </Section>
        </Content>
      </Container>

      <FilterSituations />
    </Wrapper>
  )
}

export default Dashboard
