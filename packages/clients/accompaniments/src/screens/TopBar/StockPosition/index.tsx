import React from 'react'
import {
  MdCompare,
  MdTrackChanges,
  MdInbox,
  MdAssignmentLate
} from 'react-icons/md'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { MdFilter } from '~/components/Icons'
import { HomeScreenTabs } from '~/screens/types'

const HomeScreenTopBarStockPosition: React.FC = () => {
  return (
    <TabOptions.Content name={HomeScreenTabs.STOCK_POSITION}>
      <ButtonGroup currentButton="general">
        <ButtonGroup.Button
          name="general"
          label="Estoque Geral"
          icon={<MdInbox />}
          width={80}
        />

        <ButtonGroup.Button
          name="syntheticMovement"
          label="Movimento Sintético"
          icon={<MdTrackChanges />}
          width={90}
        />

        <ButtonGroup.Button
          name="master"
          label="Master"
          icon={<MdAssignmentLate />}
          width={80}
        />

        <ButtonGroup.Button
          name="comparative"
          label="Comparativo"
          icon={<MdCompare />}
          width={95}
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

export { HomeScreenTopBarStockPosition }
