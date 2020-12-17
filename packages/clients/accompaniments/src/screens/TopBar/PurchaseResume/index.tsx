import React from 'react'
import {
  MdShoppingCart,
  MdLocalShipping,
  MdTrendingUp,
  MdPublic
} from 'react-icons/md'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { MdFilter } from '~/components/Icons'
import { HomeScreenTabs } from '~/screens/types'

const HomeScreenTopBarPurchaseResume: React.FC = () => {
  return (
    <TabOptions.Content name={HomeScreenTabs.PURCHASES_RESUME}>
      <ButtonGroup currentButton="fromProvider">
        <ButtonGroup.Button
          name="fromProvider"
          label="Por Fornecedor"
          icon={<MdLocalShipping />}
          width={85}
        />

        <ButtonGroup.Button
          name="fromEvolution"
          label="Por Evolução"
          icon={<MdTrendingUp />}
          width={80}
        />

        <ButtonGroup.Button
          name="fromState"
          label="Por Estado"
          icon={<MdPublic />}
          width={80}
        />

        <ButtonGroup.Button
          name="fromBuyer"
          label="Por Comprador"
          icon={<MdShoppingCart />}
          width={85}
        />
      </ButtonGroup>

      <TabOptions.Content.Separator />

      <ActionIconButton
        icon={<MdFilter />}
        onClick={console.log}
        width={80}
        label="Aplicar Filtro"
      />
    </TabOptions.Content>
  )
}

export { HomeScreenTopBarPurchaseResume }
