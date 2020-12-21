import React from 'react'

import { RepresentativityCharts } from '~/screens/Accompaniments/GeneralResume/Representativity/Charts'
import { RepresentativityContextProvider } from '~/screens/Accompaniments/GeneralResume/Representativity/context'
import { RepresentativityValuesTable } from '~/screens/Accompaniments/GeneralResume/Representativity/ValuesTable'
import { Section } from '~/screens/Accompaniments/GeneralResume/styles'

import { AccompanimentsGeneralResumeProps } from '../types'

const GeneralResumeRepresentativity: React.VFC<AccompanimentsGeneralResumeProps> = ({
  changeCurrentInProgressTab
}) => {
  return (
    <RepresentativityContextProvider {...{ changeCurrentInProgressTab }}>
      <Section>
        <h2>Representatividade</h2>

        <RepresentativityCharts />

        <RepresentativityValuesTable />
      </Section>
    </RepresentativityContextProvider>
  )
}

export { GeneralResumeRepresentativity }
