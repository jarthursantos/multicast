import React, { useState } from 'react'

import { Pager } from '@shared/web-components'

import ReportSelector from '~/components/ReportSelector'

import Reports from './Reports'
import { Wrapper, Container } from './styles'
import { SalesByProviderProps } from './types'

const SalesByProvider: React.VFC<SalesByProviderProps> = ({ currentPage }) => {
  const [currentReport, setReport] = useState<string>()

  return (
    <Wrapper>
      <ReportSelector
        reports={[
          { name: 'perClient', title: 'Por Cliente' },
          { name: 'perIndustry', title: 'Por Ramo de Atividade' },
          { name: 'perRegion', title: 'Por Região' },
          { name: 'perSquare', title: 'Por Praça' },
          { name: 'perRoute', title: 'Por Rota' },
          { name: 'perSupervisor', title: 'Por Supervisor' },
          { name: 'perSupervisorRCA', title: 'Por Supervisor/RCA' },
          { name: 'perRCA', title: 'Por RCA' },
          { name: 'perProduct', title: 'Por Produto' },
          { name: 'perCategory', title: 'Por Categoria' },
          { name: 'perProductCategory', title: 'Por Categoria Produto' },
          { name: 'perClienSalesValue', title: 'Por Cliente Valor Venda' },
          {
            name: 'perProductSalesQuantity',
            title: 'Por Produto Quantidade Venda'
          },
          { name: 'perProductSalesValue', title: 'Por Produto Valor Venda' },
          {
            name: 'perSquareClientProduct',
            title: 'Por Praça/Cliente/Produto'
          },
          { name: 'perClientLitigation', title: 'Por Cliente Litragem' },
          {
            name: 'perProviderValueGoal',
            title: 'Por Fornecedor Venda x Meta'
          },
          { name: 'perProviderLitigation', title: 'Por Fornecedor Litragem' },
          { name: 'perRCASalesValue', title: 'Por RCA Valor Venda' }
        ]}
        initialReport="perClient"
        onReportChange={setReport}
      />

      <Container>
        <Pager currentPage={currentPage}>
          <Pager.Page name="data">
            <Pager currentPage={currentReport}>
              <Pager.Page name="perClient">
                <Reports.PerClient.Data />
              </Pager.Page>
              <Pager.Page name="perIndustry">
                <Reports.PerIndustry.Data />
              </Pager.Page>
              <Pager.Page name="perRegion">
                <Reports.PerRegion.Data />
              </Pager.Page>
              <Pager.Page name="perSquare">
                <Reports.PerSquare.Data />
              </Pager.Page>
              <Pager.Page name="perRoute">
                <Reports.PerRoute.Data />
              </Pager.Page>
              <Pager.Page name="perSupervisor">
                <Reports.PerSupervisor.Data />
              </Pager.Page>
              <Pager.Page name="perSupervisorRCA">
                <Reports.PerSupervisorRCA.Data />
              </Pager.Page>
              <Pager.Page name="perRCA">
                <Reports.PerRCA.Data />
              </Pager.Page>
              <Pager.Page name="perProduct">
                <Reports.PerProduct.Data />
              </Pager.Page>
              <Pager.Page name="perCategory">
                <Reports.PerCategory.Data />
              </Pager.Page>
              <Pager.Page name="perProductCategory">
                <Reports.PerProductCategory.Data />
              </Pager.Page>
              <Pager.Page name="perClienSalesValue">
                <Reports.PerClientSalesValue.Data />
              </Pager.Page>
              <Pager.Page name="perProductSalesQuantity">
                <Reports.PerClientSalesValue.Data />
              </Pager.Page>
              <Pager.Page name="perProductSalesValue">
                <Reports.PerProductSalesValue.Data />
              </Pager.Page>
              <Pager.Page name="perSquareClientProduct">
                <Reports.PerSquareClientProduct.Data />
              </Pager.Page>
              <Pager.Page name="perClientLitigation">
                <Reports.PerClientLitigation.Data />
              </Pager.Page>
              <Pager.Page name="perProviderValueGoal">
                <Reports.PerProviderValueGoal.Data />
              </Pager.Page>
              <Pager.Page name="perProviderLitigation">
                <Reports.PerProviderLitigation.Data />
              </Pager.Page>
              <Pager.Page name="perRCASalesValue">
                <Reports.PerRCASalesValue.Data />
              </Pager.Page>
            </Pager>
          </Pager.Page>

          <Pager.Page name="month">
            <Pager currentPage={currentReport}>
              <Pager.Page name="perClient">
                <Reports.PerClient.Month />
              </Pager.Page>
              <Pager.Page name="perIndustry">
                <Reports.PerIndustry.Month />
              </Pager.Page>
              <Pager.Page name="perRegion">
                <Reports.PerRegion.Month />
              </Pager.Page>
              <Pager.Page name="perSquare">
                <Reports.PerSquare.Month />
              </Pager.Page>
              <Pager.Page name="perRoute">
                <Reports.PerRoute.Month />
              </Pager.Page>
              <Pager.Page name="perSupervisor">
                <Reports.PerSupervisor.Month />
              </Pager.Page>
              <Pager.Page name="perSupervisorRCA">
                <Reports.PerSupervisorRCA.Month />
              </Pager.Page>
              <Pager.Page name="perRCA">
                <Reports.PerRCA.Month />
              </Pager.Page>
              <Pager.Page name="perProduct">
                <Reports.PerProduct.Month />
              </Pager.Page>
              <Pager.Page name="perCategory">
                <Reports.PerCategory.Month />
              </Pager.Page>
              <Pager.Page name="perProductCategory">
                <Reports.PerProductCategory.Month />
              </Pager.Page>
              <Pager.Page name="perClienSalesValue">
                <Reports.PerClientSalesValue.Month />
              </Pager.Page>
              <Pager.Page name="perProductSalesQuantity">
                <Reports.PerClientSalesValue.Month />
              </Pager.Page>
              <Pager.Page name="perProductSalesValue">
                <Reports.PerProductSalesValue.Month />
              </Pager.Page>
              <Pager.Page name="perSquareClientProduct">
                <Reports.PerSquareClientProduct.Month />
              </Pager.Page>
              <Pager.Page name="perClientLitigation">
                <Reports.PerClientLitigation.Month />
              </Pager.Page>
              <Pager.Page name="perProviderValueGoal">
                <Reports.PerProviderValueGoal.Month />
              </Pager.Page>
              <Pager.Page name="perProviderLitigation">
                <Reports.PerProviderLitigation.Month />
              </Pager.Page>
              <Pager.Page name="perRCASalesValue">
                <Reports.PerRCASalesValue.Month />
              </Pager.Page>
            </Pager>
          </Pager.Page>
        </Pager>
      </Container>
    </Wrapper>
  )
}

export default SalesByProvider
