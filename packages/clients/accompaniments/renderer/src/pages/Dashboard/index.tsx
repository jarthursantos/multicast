import React, { useMemo, useState } from 'react'
import { Pie } from 'react-chartjs-2'

import { parseISO, format } from 'date-fns'

import ColorIndicator from '~/components/ColorIndicator'
import { useTypedSelector } from '~/store'
import {
  useNonRevisedAccompaniments,
  useRevisedAccompaniments,
  useReleasedAccompaniments,
  useExpectedBillingAccompaniments,
  useBilledAccompaniments,
  useFreeOnBoardAccompaniments,
  useSchedulingAccompaniments
} from '~/store/context'
import { Accompaniment as AccompanimentData } from '~/store/modules/accompaniments/types'

import FilterSituations from './FilterSituations'
import { FilterSituationsData } from './FilterSituations/types'
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
  TimelineLabelWrapper,
  TimelineLabelContainer,
  TimelineLabel,
  TimelineLegend,
  TimelineCount
} from './styles'
import Timeline from './Timeline'
import { SectionProps } from './types'

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

const Dashboard: React.FC = () => {
  const { accompaniments } = useTypedSelector(state => state.accompaniments)

  const nonRevised = useNonRevisedAccompaniments()
  const revised = useRevisedAccompaniments()
  const released = useReleasedAccompaniments()
  const expectedBilling = useExpectedBillingAccompaniments()
  const billed = useBilledAccompaniments()
  const freeOnBoard = useFreeOnBoardAccompaniments()
  const scheduling = useSchedulingAccompaniments()

  const [filters, setFilters] = useState<FilterSituationsData>()

  const countData = useMemo(() => {
    return buildData(
      nonRevised.length,
      revised.length,
      released.length,
      expectedBilling.length,
      billed.length,
      freeOnBoard.length,
      scheduling.length
    )
  }, [
    nonRevised,
    revised,
    released,
    expectedBilling,
    billed,
    freeOnBoard,
    scheduling
  ])

  const amountData = useMemo(() => {
    return buildData(
      nonRevised.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      revised.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      released.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      expectedBilling.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      billed.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      freeOnBoard.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      ),
      scheduling.reduce(
        (curr, { purchaseOrder: { amountValue } }) => curr + amountValue,
        0
      )
    )
  }, [
    nonRevised,
    revised,
    released,
    expectedBilling,
    billed,
    freeOnBoard,
    scheduling
  ])

  const deliveredData = useMemo(() => {
    return buildData(
      nonRevised.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      revised.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      released.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      expectedBilling.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      billed.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      freeOnBoard.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      ),
      scheduling.reduce(
        (curr, { purchaseOrder: { deliveredValue } }) => curr + deliveredValue,
        0
      )
    )
  }, [
    nonRevised,
    revised,
    released,
    expectedBilling,
    billed,
    freeOnBoard,
    scheduling
  ])

  const sections = useMemo((): SectionProps[] => {
    const newMap = new Map<string, AccompanimentData[]>()
    newMap.set('none', [])

    const map = accompaniments.reduce((curr, accompaniment) => {
      let date: string

      if (accompaniment.schedulingAt) {
        return curr
      }

      if (filters) {
        if (!filters.nonSended && accompaniment.sendedAt) {
          return curr
        }
      }

      if (!accompaniment.sendedAt) {
        date = 'none'
      } else {
        date = format(
          typeof accompaniment.updatedAt === 'string'
            ? parseISO(accompaniment.updatedAt)
            : accompaniment.updatedAt,
          'dd/MM/yyyy'
        )
      }

      if (!curr.has(date)) {
        curr.set(date, [])
      }

      curr.get(date).push(accompaniment)

      return curr
    }, newMap)

    const result: SectionProps[] = []

    for (const [key, value] of map.entries()) {
      const prefix = key === 'none' ? 'Sem' : 'Última'
      const suffix = key === 'none' ? '' : key

      result.push({
        header: `${prefix} atualização no acompanhamento ${suffix}`.trim(),
        accompaniments: value
      })
    }

    return result
  }, [accompaniments, filters])

  return (
    <Wrapper>
      <Container>
        <Content>
          <Section>
            <h2>Representatividade</h2>

            <ChartsContainer>
              <ChartWrapper>
                <Pie
                  width={100}
                  height={100}
                  data={countData}
                  options={buildOptions('Nº Pedidos (Qtd.)')}
                />
              </ChartWrapper>

              <ChartWrapper>
                <Pie
                  width={100}
                  height={100}
                  data={amountData}
                  options={buildOptions('Valor Total (R$)')}
                />
              </ChartWrapper>

              <ChartWrapper>
                <Pie
                  width={100}
                  height={100}
                  data={deliveredData}
                  options={buildOptions('Valor Entregue (R$)')}
                />
              </ChartWrapper>
            </ChartsContainer>

            <ChartsLegendContainer>
              <ChartLegend>
                <ColorIndicator color={colors[0]} />
                <strong>A Enviar</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[1]} />
                <strong>A Revisar</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[2]} />
                <strong>A Liberar</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[3]} />
                <strong>A Prev. Faturamento</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[4]} />
                <strong>A Faturar</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[5]} />
                <strong>A Agendar FOB</strong>
              </ChartLegend>
              <ChartLegend>
                <ColorIndicator color={colors[6]} />
                <strong>A Prev. Agendamento</strong>
              </ChartLegend>
            </ChartsLegendContainer>
          </Section>

          <Section>
            <h2>Timeline</h2>

            <TimelineLegendContainer>
              <TimelineLabelWrapper>
                <TimelineLabelContainer className="danger">
                  <TimelineLabel>
                    Atrasado
                    <TimelineCount>50</TimelineCount>
                  </TimelineLabel>
                </TimelineLabelContainer>

                <TimelineLabelContainer className="warning">
                  <TimelineLabel>
                    Dentro do Limite
                    <TimelineCount>10</TimelineCount>
                  </TimelineLabel>
                </TimelineLabelContainer>

                <TimelineLabelContainer className="inDay">
                  <TimelineLabel>
                    Em dia
                    <TimelineCount>10</TimelineCount>
                  </TimelineLabel>
                </TimelineLabelContainer>
              </TimelineLabelWrapper>

              <TimelineLegend />
            </TimelineLegendContainer>
          </Section>

          {sections.map((section, index) => (
            <Section key={index}>
              <h3>{section.header}</h3>

              <Timeline accompaniments={section.accompaniments} />
            </Section>
          ))}
        </Content>
      </Container>

      <FilterSituations onChange={setFilters} />
    </Wrapper>
  )
}

export default Dashboard
