import React from 'react'

import { useOpenWindow } from '~/hooks/use-open-window'

import {
  Wrapper,
  HeaderContainer,
  HeaderLabel,
  BodyContainer,
  Item,
  ItemLabel
} from './styles'

const Timeline: React.FC = () => {
  const handleOpenAccompaniment = useOpenWindow('Accompaniment')

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
      </HeaderContainer>

      <BodyContainer>
        <Item onClick={() => handleOpenAccompaniment(15000)}>
          <ItemLabel id="number">15000</ItemLabel>
          <ItemLabel id="providerCode">83</ItemLabel>
          <ItemLabel id="providerName">Tintas Lux LTDA</ItemLabel>
          <ItemLabel id="fantasy">Tintas Lux LTDA</ItemLabel>
          <ItemLabel id="invoice">-</ItemLabel>
          <ItemLabel id="emittedAt">01/10/2020</ItemLabel>
          <ItemLabel id="situation">Sem Revisão</ItemLabel>
        </Item>
        <Item>
          <ItemLabel id="number">15000</ItemLabel>
          <ItemLabel id="providerCode">83</ItemLabel>
          <ItemLabel id="providerName">Tintas Lux LTDA</ItemLabel>
          <ItemLabel id="fantasy">Tintas Lux LTDA</ItemLabel>
          <ItemLabel id="invoice">687146</ItemLabel>
          <ItemLabel id="emittedAt">01/10/2020</ItemLabel>
          <ItemLabel id="situation">Sem Liberação</ItemLabel>
        </Item>
        <Item>
          <ItemLabel id="number">15000</ItemLabel>
          <ItemLabel id="providerCode">83</ItemLabel>
          <ItemLabel id="providerName">Tintas Lux LTDA</ItemLabel>
          <ItemLabel id="fantasy">Tintas Lux LTDA</ItemLabel>
          <ItemLabel id="invoice">687146</ItemLabel>
          <ItemLabel id="emittedAt">01/10/2020</ItemLabel>
          <ItemLabel id="situation">Sem Prev. de Faturamento</ItemLabel>
        </Item>
      </BodyContainer>
    </Wrapper>
  )
}

export default Timeline
