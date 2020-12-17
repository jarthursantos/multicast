import React from 'react'

import { format, parseISO } from 'date-fns'

import {
  Wrapper,
  HeaderContainer,
  HeaderLabel,
  BodyContainer,
  Item,
  ItemLabel
} from '~/screens/Accompaniments/GeneralResume/DelayedPresenter/Timeline/styles'
import { SectionTimelineProps } from '~/screens/Accompaniments/GeneralResume/DelayedPresenter/Timeline/types'
import { useTypedSelector } from '~/store'
import { CriticalLevel } from '~/store/modules/accompaniments/types'
import { openAccompanimentDetails } from '~/windows/AccompanimentDetails/actions'

const SectionTimeline: React.VFC<SectionTimelineProps> = ({
  accompaniments
}) => {
  const { token } = useTypedSelector(state => state.auth)

  return (
    <Wrapper>
      <HeaderContainer>
        <HeaderLabel id="number">Nº Pedido</HeaderLabel>
        <HeaderLabel id="providerCode">Cód. Fornec.</HeaderLabel>
        <HeaderLabel id="providerName">Fornecedor</HeaderLabel>
        <HeaderLabel id="fantasy">Fantasia</HeaderLabel>
        <HeaderLabel id="invoice">Nota Fiscal</HeaderLabel>
        <HeaderLabel id="emittedAt">Emissão</HeaderLabel>
        <HeaderLabel id="delay">Atraso (Dias)</HeaderLabel>
        <HeaderLabel id="observation">Obs.</HeaderLabel>
      </HeaderContainer>

      <BodyContainer>
        {accompaniments.map(accompaniment => (
          <Item
            key={accompaniment.id}
            onClick={() => openAccompanimentDetails(accompaniment, token)}
            className={
              accompaniment.criticalLevel === CriticalLevel.DANGER
                ? 'danger'
                : accompaniment.criticalLevel === CriticalLevel.ALERT
                ? 'alert'
                : ''
            }
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
              {accompaniment.purchaseOrder.provider.fantasy || '-'}
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
            <ItemLabel id="delay">{accompaniment.delay || '-'}</ItemLabel>
            <ItemLabel id="observation">
              {accompaniment.annotations.length || '-'}
            </ItemLabel>
          </Item>
        ))}
      </BodyContainer>
    </Wrapper>
  )
}

export { SectionTimeline }
