import React from 'react'
import { MdToday } from 'react-icons/md'

import {
  TabOptions,
  ButtonGroup,
  ActionIconButton
} from '@shared/web-components'

import { MdFilter, MdTableChart } from '~/components/Icons'
import { HomeScreenTabs } from '~/screens/types'

const HomeScreenTopBarSalesByProvider: React.FC = () => {
  return (
    <TabOptions.Content name={HomeScreenTabs.SALES_BY_PROVIDER}>
      <ButtonGroup currentButton="data">
        <ButtonGroup.Button
          name="data"
          label="Dados"
          icon={<MdTableChart />}
          width={80}
        />

        <ButtonGroup.Button
          name="month"
          label="Por Mês"
          icon={<MdToday />}
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

export { HomeScreenTopBarSalesByProvider }
