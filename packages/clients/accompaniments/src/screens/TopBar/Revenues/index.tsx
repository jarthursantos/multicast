import React from 'react'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { MdBarChart, MdFilter, MdTableChart } from '~/components/Icons'
import { HomeScreenTabs } from '~/screens/types'

const HomeScreenTopBarRevenues: React.FC = () => {
  return (
    <TabOptions.Content name={HomeScreenTabs.REVENUES}>
      <ButtonGroup currentButton="data">
        <ButtonGroup.Button
          name="data"
          label="Dados"
          icon={<MdTableChart />}
          width={80}
        />

        <ButtonGroup.Button
          name="graphs"
          label="Gráficos"
          icon={<MdBarChart />}
          width={80}
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

export { HomeScreenTopBarRevenues }
