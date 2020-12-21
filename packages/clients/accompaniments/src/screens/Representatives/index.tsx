import React, { useContext } from 'react'

import { Pager } from '@shared/web-components/Pager'

import { HomeScreenContext } from '~/screens/context'
import { RepresentativesAll } from '~/screens/Representatives/All'
import { RepresentativesBuyer } from '~/screens/Representatives/Buyer'
import { RepresentativesRepresentative } from '~/screens/Representatives/Representative'
import { RepresentativeTabs } from '~/screens/types'

import { RepresentativesContextProvider } from './context'

const RepresentativesScreen: React.FC = () => {
  const { currentRepresentativeTab } = useContext(HomeScreenContext)

  return (
    <RepresentativesContextProvider>
      <Pager currentPage={currentRepresentativeTab}>
        <Pager.Page name={RepresentativeTabs.ALL}>
          <RepresentativesAll />
        </Pager.Page>

        <Pager.Page name={RepresentativeTabs.REPRESENTATIVE}>
          <RepresentativesRepresentative />
        </Pager.Page>

        <Pager.Page name={RepresentativeTabs.BUYER}>
          <RepresentativesBuyer />
        </Pager.Page>
      </Pager>
    </RepresentativesContextProvider>
  )
}

export { RepresentativesScreen }
