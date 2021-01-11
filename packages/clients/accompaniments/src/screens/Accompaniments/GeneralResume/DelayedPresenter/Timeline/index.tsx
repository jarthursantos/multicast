import React, { useMemo } from 'react'

import { format, parseISO } from 'date-fns'

import { Button } from '@shared/web-components/Button'

import { useTypedSelector } from '~/store'
import { delayComparer } from '~/store/context'
import { CriticalLevel } from '~/store/modules/accompaniments/types'
import { openAccompanimentDetails } from '~/windows/AccompanimentDetails/actions'

import {
  Wrapper,
  HeaderContainer,
  HeaderLabel,
  BodyContainer,
  Item,
  ItemLabel
} from './styles'
import { SectionTimelineProps } from './types'

const SectionTimeline: React.VFC<SectionTimelineProps> = ({
  accompaniments,
  onShowMoreClick
}) => {
  const { token } = useTypedSelector(state => state.auth)

  const remainingCount = useMemo(() => accompaniments.length - 5, [
    accompaniments
  ])

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
        {accompaniments
          .splice(0, 5)
          .sort(delayComparer)
          .map(accompaniment => (
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

      {remainingCount > 0 && (
        <Button
          secondary
          onClick={onShowMoreClick}
          label={`Exibir mais ${remainingCount} acompanhamento${
            remainingCount === 1 ? '' : 's'
          }`}
        />
      )}
    </Wrapper>
  )
}

export { SectionTimeline }
