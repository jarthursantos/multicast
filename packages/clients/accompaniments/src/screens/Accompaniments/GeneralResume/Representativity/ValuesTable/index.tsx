import React, { useCallback, useContext } from 'react'

import { formatPriceWithoutSymbol } from '@shared/web-components/DataGrid/Body/Row/Cell/Contabil/format'

import { ColorIndicator } from '~/components/ColorIndicator'
import { colors } from '~/screens/Accompaniments/GeneralResume/Representativity/Charts'
import { RepresentativityContext } from '~/screens/Accompaniments/GeneralResume/Representativity/context'
import { InProgressTabs } from '~/screens/Accompaniments/InProgress/types'
import { HomeScreenContext } from '~/screens/context'
import { AccompanimentTabs } from '~/screens/types'

import {
  Wrapper,
  Header,
  HeaderLabel,
  Row,
  CellLabel,
  FirstRow,
  LastRow
} from './styles'

const RepresentativityValuesTable: React.VFC = () => {
  const { changeAccompanimentTab } = useContext(HomeScreenContext)

  const {
    countData,
    amountData,
    deliveredData,
    changeCurrentInProgressTab
  } = useContext(RepresentativityContext)

  const handleGoTo = useCallback(
    (tab: InProgressTabs) => {
      return () => {
        changeAccompanimentTab(AccompanimentTabs.IN_PROGRESS)
        changeCurrentInProgressTab(tab)
      }
    },
    [changeAccompanimentTab, changeCurrentInProgressTab]
  )

  return (
    <Wrapper>
      <Header>
        <HeaderLabel className="count">Nº Pedidos (Qtd.)</HeaderLabel>
        <HeaderLabel className="amount">Valor Total (R$)</HeaderLabel>
        <HeaderLabel className="delivered">Valor Entregue (R$)</HeaderLabel>
      </Header>

      <FirstRow>
        <CellLabel
          className="tab"
          onClick={handleGoTo(InProgressTabs.NON_SENDED)}
        >
          <ColorIndicator color={colors[0]} />
          <strong>A Enviar</strong>
        </CellLabel>
        <CellLabel className="count">{countData[0]}</CellLabel>
        <CellLabel className="amount">
          {formatPriceWithoutSymbol(amountData[0])}
        </CellLabel>
        <CellLabel className="delivered">
          {formatPriceWithoutSymbol(deliveredData[0])}
        </CellLabel>
      </FirstRow>

      <Row>
        <CellLabel
          className="tab"
          onClick={handleGoTo(InProgressTabs.NON_REVISED)}
        >
          <ColorIndicator color={colors[1]} />
          <strong>A Revisar</strong>
        </CellLabel>
        <CellLabel className="count">{countData[1]}</CellLabel>
        <CellLabel className="amount">
          {formatPriceWithoutSymbol(amountData[1])}
        </CellLabel>
        <CellLabel className="delivered">
          {formatPriceWithoutSymbol(deliveredData[1])}
        </CellLabel>
      </Row>

      <Row>
        <CellLabel
          className="tab"
          onClick={handleGoTo(InProgressTabs.NON_RELEASED)}
        >
          <ColorIndicator color={colors[2]} />
          <strong>A Liberar</strong>
        </CellLabel>
        <CellLabel className="count">{countData[2]}</CellLabel>
        <CellLabel className="amount">
          {formatPriceWithoutSymbol(amountData[2])}
        </CellLabel>
        <CellLabel className="delivered">
          {formatPriceWithoutSymbol(deliveredData[2])}
        </CellLabel>
      </Row>

      <Row>
        <CellLabel
          className="tab"
          onClick={handleGoTo(InProgressTabs.NON_EXPECTED_BILLING)}
        >
          <ColorIndicator color={colors[3]} />
          <strong>A Prev. Faturamento</strong>
        </CellLabel>
        <CellLabel className="count">{countData[3]}</CellLabel>
        <CellLabel className="amount">
          {formatPriceWithoutSymbol(amountData[3])}
        </CellLabel>
        <CellLabel className="delivered">
          {formatPriceWithoutSymbol(deliveredData[3])}
        </CellLabel>
      </Row>

      <Row>
        <CellLabel
          className="tab"
          onClick={handleGoTo(InProgressTabs.NON_BILLED)}
        >
          <ColorIndicator color={colors[4]} />
          <strong>A Faturar</strong>
        </CellLabel>
        <CellLabel className="count">{countData[4]}</CellLabel>
        <CellLabel className="amount">
          {formatPriceWithoutSymbol(amountData[4])}
        </CellLabel>
        <CellLabel className="delivered">
          {formatPriceWithoutSymbol(deliveredData[4])}
        </CellLabel>
      </Row>

      <Row>
        <CellLabel
          className="tab"
          onClick={handleGoTo(InProgressTabs.NON_FREE_ON_BOARD)}
        >
          <ColorIndicator color={colors[5]} />
          <strong>A Agendar FOB</strong>
        </CellLabel>
        <CellLabel className="count">{countData[5]}</CellLabel>
        <CellLabel className="amount">
          {formatPriceWithoutSymbol(amountData[5])}
        </CellLabel>
        <CellLabel className="delivered">
          {formatPriceWithoutSymbol(deliveredData[5])}
        </CellLabel>
      </Row>

      <LastRow>
        <CellLabel
          className="tab"
          onClick={handleGoTo(InProgressTabs.NON_SCHEDULING)}
        >
          <ColorIndicator color={colors[6]} />
          <strong>A Prev. Agendamento</strong>
        </CellLabel>
        <CellLabel className="count">{countData[6]}</CellLabel>
        <CellLabel className="amount">
          {formatPriceWithoutSymbol(amountData[6])}
        </CellLabel>
        <CellLabel className="delivered">
          {formatPriceWithoutSymbol(deliveredData[6])}
        </CellLabel>
      </LastRow>
    </Wrapper>
  )
}

export { RepresentativityValuesTable }
