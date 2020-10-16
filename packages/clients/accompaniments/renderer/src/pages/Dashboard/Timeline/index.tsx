import React, { useCallback } from 'react'

import { format, parseISO } from 'date-fns'

import { useOpenWindow } from '~/hooks/use-open-window'
import { Accompaniment } from '~/store/modules/accompaniments/types'

import {
  Wrapper,
  HeaderContainer,
  HeaderLabel,
  BodyContainer,
  Item,
  ItemLabel
} from './styles'
import { TimelineProps } from './types'

const Timeline: React.VFC<TimelineProps> = ({ accompaniments }) => {
  const openAccompaniment = useOpenWindow('Accompaniment')

  const handleOpenAccompaniment = useCallback(
    (item: Accompaniment) => openAccompaniment(item.id),
    [openAccompaniment]
  )

  const resolveSituation = (accompaniment: Accompaniment) => {
    if (!accompaniment.sendedAt) {
      return 'Sem Envio'
    }

    if (!accompaniment.reviewedAt) {
      return 'Sem Revisão'
    }

    if (!accompaniment.releasedAt) {
      return 'Sem Liberação'
    }

    if (!accompaniment.expectedBillingAt) {
      return 'Sem Prev. Faturamento'
    }

    if (!accompaniment.transactionNumber) {
      return 'Sem Faturamento'
    }

    if (
      !accompaniment.freeOnBoardAt &&
      accompaniment.purchaseOrder.freight === 'FOB'
    ) {
      return 'Sem Agendamento FOB'
    }

    if (!accompaniment.schedulingAt) {
      return 'Sem Prev. Agendamento'
    }

    return '-'
  }

  return (
    <Wrapper>
      <HeaderContainer>
        <HeaderLabel id="number">Nº Pedido</HeaderLabel>
        <HeaderLabel id="providerCode">Cód. Fornec.</HeaderLabel>
        <HeaderLabel id="providerName">Fornecedor</HeaderLabel>
        <HeaderLabel id="fantasy">Fantasia</HeaderLabel>
        <HeaderLabel id="invoice">Nota Fiscal</HeaderLabel>
        <HeaderLabel id="emittedAt">Emissão</HeaderLabel>
        <HeaderLabel id="situation">Situação</HeaderLabel>
        <HeaderLabel id="observation">Obs.</HeaderLabel>
      </HeaderContainer>

      <BodyContainer>
        {accompaniments.map(accompaniment => (
          <Item
            key={accompaniment.id}
            onClick={() => handleOpenAccompaniment(accompaniment)}
          >
            <ItemLabel id="number">
              {accompaniment.purchaseOrder.number}
            </ItemLabel>
            <ItemLabel id="providerCode">
              {accompaniment.purchaseOrder.provider.code}
            </ItemLabel>
            <ItemLabel id="providerName">
              {accompaniment.purchaseOrder.provider.name}
            </ItemLabel>
            <ItemLabel id="fantasy">
              {accompaniment.purchaseOrder.provider.fantasy}
            </ItemLabel>
            <ItemLabel id="invoice">
              {accompaniment.invoiceNumber || '-'}
            </ItemLabel>
            <ItemLabel id="emittedAt">
              {format(
                typeof accompaniment.purchaseOrder.emittedAt === 'string'
                  ? parseISO(accompaniment.purchaseOrder.emittedAt)
                  : accompaniment.purchaseOrder.emittedAt,
                'dd/MM/yyyy'
              )}
            </ItemLabel>
            <ItemLabel id="situation">
              {resolveSituation(accompaniment)}
            </ItemLabel>
            <ItemLabel id="observation">
              {accompaniment.annotations.length || '-'}
            </ItemLabel>
          </Item>
        ))}
      </BodyContainer>
    </Wrapper>
  )
}

export default Timeline
