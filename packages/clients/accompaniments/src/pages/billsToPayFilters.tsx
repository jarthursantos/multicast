import React from 'react'

import Head from 'next/head'

import { useSetupAuth } from '~/hooks/use-setup-auth'
import { BillsToPayFilterScreen } from '~/screens/BillsToPayFilter'
import { useBillsToPayFilters } from '~/windows/BillsToPayFilters/action'

const Home = () => {
  const [filters, token] = useBillsToPayFilters()

  useSetupAuth(token)

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Contas a Pagar - Filtros</title>
      </Head>

      <BillsToPayFilterScreen filters={filters} />
    </React.Fragment>
  )
}

export default Home
