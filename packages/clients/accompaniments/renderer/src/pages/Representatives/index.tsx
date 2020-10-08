import React from 'react'

import { Pager } from '@shared/web-components'

import { RepresentativesContextProvider } from './context'
import General from './General'
import PerBuyer from './PerBuyer'
import PerRepresentative from './PerRepresentative'
import { RepresentativesPageProps } from './types'

const Representatives: React.VFC<RepresentativesPageProps> = ({
  currentPage
}) => {
  return (
    <RepresentativesContextProvider>
      <Pager currentPage={currentPage}>
        <Pager.Page name="general">
          <General />
        </Pager.Page>

        <Pager.Page name="perRepresentative">
          <PerRepresentative />
        </Pager.Page>

        <Pager.Page name="perBuyer">
          <PerBuyer />
        </Pager.Page>
      </Pager>
    </RepresentativesContextProvider>
  )
}

export default Representatives
