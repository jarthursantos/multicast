import React, { useCallback, useContext, useRef } from 'react'
import { MdGroup, MdPerson, MdShoppingCart } from 'react-icons/md'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { MdFilter } from '~/components/Icons'
import { HomeScreenContext } from '~/screens/context'
import { HomeScreenTabs, RepresentativeTabs } from '~/screens/types'

import {
  RepresentativesFilter,
  RepresentativesFilterHandles
} from './FilterDialog'

const HomeScreenTopBarRepresentatives: React.FC = () => {
  const { currentRepresentativeTab, changeRepresentativeTab } = useContext(
    HomeScreenContext
  )

  const filterRef = useRef<RepresentativesFilterHandles>(null)
  const filterButtonRef = useRef<HTMLDivElement>(null)

  const handleFilter = useCallback(() => {
    filterRef.current?.open(filterButtonRef.current.getBoundingClientRect())
  }, [filterRef, filterButtonRef])

  return (
    <React.Fragment>
      <TabOptions.Content name={HomeScreenTabs.REPRESENTATIVES}>
        <ButtonGroup
          currentButton={currentRepresentativeTab}
          onSelectionChange={changeRepresentativeTab}
        >
          <ButtonGroup.Button
            name={RepresentativeTabs.ALL}
            label="Tabela Geral"
            icon={<MdGroup />}
            width={80}
          />

          <ButtonGroup.Button
            name={RepresentativeTabs.REPRESENTATIVE}
            label="Agrupar por Representante"
            icon={<MdPerson />}
            width={108}
          />

          <ButtonGroup.Button
            name={RepresentativeTabs.BUYER}
            label="Agrupar por Comprador"
            icon={<MdShoppingCart />}
            width={105}
          />
        </ButtonGroup>

        <TabOptions.Content.Separator />

        <div ref={filterButtonRef}>
          <ActionIconButton
            icon={<MdFilter />}
            onClick={handleFilter}
            width={80}
            label="Aplicar Filtro"
          />
        </div>
      </TabOptions.Content>

      <RepresentativesFilter ref={filterRef} />
    </React.Fragment>
  )
}

export { HomeScreenTopBarRepresentatives }
