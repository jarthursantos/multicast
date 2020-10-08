import React from 'react'
import { Pie } from 'react-chartjs-2'

import ColorIndicator from '~/components/ColorIndicator'

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
  TimelineLegendContainer,
  TimelineLabelContainer,
  TimelineLabel,
  TimelineLegend
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
      data: [11, 5],
      backgroundColor: colors,
      hoverBackgroundColor: colors
    }
  ]
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
                  options={buildOptions('Nº Pedidos (Qtd.)')}
                />
              </ChartWrapper>

              <ChartWrapper>
                <Pie
                  height={100}
                  width={100}
                  data={data}
                  options={buildOptions('Valor Total (R$)')}
                />
              </ChartWrapper>

              <ChartWrapper>
                <Pie
                  height={100}
                  width={100}
                  data={data}
                  options={buildOptions('Valor Entregue (R$)')}
                />
              </ChartWrapper>

              <ChartWrapper>
                <Pie
                  height={100}
                  width={100}
                  data={data}
                  options={buildOptions('Valor Pendente (R$)')}
                />
              </ChartWrapper>
            </ChartsContainer>

            <ChartsLegendContainer>
              <ChartLegend>
                <ColorIndicator color={colors[0]} />
                <strong>Em Andamento</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[1]} />
                <strong>Em Recebimento</strong>
              </ChartLegend>
            </ChartsLegendContainer>
          </Section>

          <Section>
            <h2>Timeline</h2>

            <TimelineLegendContainer>
              <TimelineLabelContainer>
                <TimelineLabel className="danger">Atrasado</TimelineLabel>
                <TimelineLabel className="warning">
                  Dentro do Limite
                </TimelineLabel>
                <TimelineLabel className="inDay">Em dia</TimelineLabel>
              </TimelineLabelContainer>

              <TimelineLegend />
            </TimelineLegendContainer>
          </Section>

          <Section>
            <h3>Sem atualizações no acompanhamento</h3>

            <Timeline />
          </Section>

          <Section>
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
