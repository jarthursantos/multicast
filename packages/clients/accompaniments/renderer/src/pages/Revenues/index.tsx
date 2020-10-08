import React, { useState } from 'react'

import { Pager } from '@shared/web-components'

import ReportSelector from '~/components/ReportSelector'

import Reports from './Reports'
import { Wrapper, Container } from './styles'
import { RevenuesProps } from './types'

const Revenues: React.FC<RevenuesProps> = ({ currentPage }) => {
  const [currentReport, setCurrentReport] = useState<string>()

  return (
    <Wrapper>
      <ReportSelector
        initialReport="perSupervisor"
        onReportChange={setCurrentReport}
        reports={[
          { name: 'perSupervisor', title: 'Por Supervisor' },
          { name: 'perMonth', title: 'Por Mês' },
          { name: 'perDeadline', title: 'Por Prazo' },
          { name: 'perEvolution', title: 'Por Evolução' },
          { name: 'perClass', title: 'Por Classe' },
          { name: 'perRegion', title: 'Por Região' },
          { name: 'perEmitter', title: 'Por Emitente' },
          { name: 'analytics', title: 'Analítico' },
          { name: 'perCharge', title: 'Por Cobrança' },
          { name: 'perCheckOut', title: 'Por CheckOut' },
          { name: 'perSalesOrigin', title: 'Por Origem Venda' },
          { name: 'perActuationArea', title: 'Por Área de Atuação' },
          { name: 'perProvider', title: 'Por Fornecedor' }
        ]}
      />

      <Container>
        <Pager currentPage={currentPage}>
          <Pager.Page name="data">
            <Pager currentPage={currentReport}>
              <Pager.Page name="perSupervisor">
                <Reports.PerSupervisor.Data />
              </Pager.Page>
              <Pager.Page name="perMonth">
                <Reports.PerMonth.Data />
              </Pager.Page>
              <Pager.Page name="perDeadline">
                <Reports.PerDeadline.Data />
              </Pager.Page>
              <Pager.Page name="perEvolution">
                <Reports.PerEvolution.Data />
              </Pager.Page>
              <Pager.Page name="perClass">
                <Reports.PerClass.Data />
              </Pager.Page>
              <Pager.Page name="perRegion">
                <Reports.PerRegion.Data />
              </Pager.Page>
              <Pager.Page name="perEmitter">
                <Reports.PerEmitter.Data />
              </Pager.Page>
              <Pager.Page name="analytics">
                <Reports.Analytic.Data />
              </Pager.Page>
              <Pager.Page name="perCharge">
                <Reports.PerCharge.Data />
              </Pager.Page>
              <Pager.Page name="perCheckOut">
                <Reports.PerCheckOut.Data />
              </Pager.Page>
              <Pager.Page name="perSalesOrigin">
                <Reports.PerSalesOrigin.Data />
              </Pager.Page>
              <Pager.Page name="perActuationArea">
                <Reports.PerActuationArea.Data />
              </Pager.Page>
              <Pager.Page name="perProvider">
                <Reports.PerProvider.Data />
              </Pager.Page>
            </Pager>
          </Pager.Page>

          <Pager.Page name="graphs">
            <Pager currentPage={currentReport}>
              <Pager.Page name="perSupervisor">
                <Reports.PerSupervisor.Graphs />
              </Pager.Page>
              <Pager.Page name="perMonth">
                <Reports.PerMonth.Graphs />
              </Pager.Page>
              <Pager.Page name="perDeadline">
                <Reports.PerDeadline.Graphs />
              </Pager.Page>
              <Pager.Page name="perEvolution">
                <Reports.PerEvolution.Graphs />
              </Pager.Page>
              <Pager.Page name="perClass">
                <Reports.PerClass.Graphs />
              </Pager.Page>
              <Pager.Page name="perRegion">
                <Reports.PerRegion.Graphs />
              </Pager.Page>
              <Pager.Page name="perEmitter">
                <Reports.PerEmitter.Graphs />
              </Pager.Page>
              <Pager.Page name="analytics">
                <Reports.Analytic.Graphs />
              </Pager.Page>
              <Pager.Page name="perCharge">
                <Reports.PerCharge.Graphs />
              </Pager.Page>
              <Pager.Page name="perCheckOut">
                <Reports.PerCheckOut.Graphs />
              </Pager.Page>
              <Pager.Page name="perSalesOrigin">
                <Reports.PerSalesOrigin.Graphs />
              </Pager.Page>
              <Pager.Page name="perActuationArea">
                <Reports.PerActuationArea.Graphs />
              </Pager.Page>
              <Pager.Page name="perProvider">
                <Reports.PerProvider.Graphs />
              </Pager.Page>
            </Pager>
          </Pager.Page>
        </Pager>
      </Container>
    </Wrapper>
  )
}

export default Revenues
