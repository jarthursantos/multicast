import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { FilterScreen } from '~/screens/Filter'
import { useFiltersPayload } from '~/windows/filters/actions'

const Filters = () => {
  const [filters, token] = useFiltersPayload()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>Filtros</title>
      </Head>

      <FilterScreen filters={filters || {}} />
    </React.Fragment>
  )
}

export default Filters
