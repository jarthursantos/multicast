import React from 'react'

import { ReportSelectorContextProvider } from './context'
import Report from './Report'
import { Wrapper, Container } from './styles'
import { ReportSelectorProps } from './types'

const ReportSelector: React.VFC<ReportSelectorProps> = ({
  reports,
  ...rest
}) => {
  return (
    <ReportSelectorContextProvider {...rest}>
      <Wrapper>
        <Container>
          {reports.map((report, index) => (
            <Report key={report.name} number={index + 1} {...report} />
          ))}
        </Container>
      </Wrapper>
    </ReportSelectorContextProvider>
  )
}

export default ReportSelector
