import React, { useState } from 'react'

import { Table } from '@shared/web-components/Table'

import { Wrapper, GroupWrapper, RepresentativesWrapper } from './styles'
import { StockNotificationsPresenterProps } from './types'

const RepresentativesPresenter: React.VFC<StockNotificationsPresenterProps> = ({
  onGroupSelectionChange,
  groupData,
  groupColumns,
  representativesData,
  representativesColumns
}) => {
  const [groupWidth, setGroupWidth] = useState(300)

  return (
    <Wrapper groupWidth={groupWidth}>
      <GroupWrapper
        width={300}
        height={Infinity}
        handleSize={[10, 100]}
        minConstraints={[250, Infinity]}
        maxConstraints={[400, Infinity]}
        onResizeStop={(_, data) => setGroupWidth(data.size.width)}
      >
        <Table
          options={{
            selectable: 1,
            layout: 'fitColumns',
            data: groupData,
            columns: groupColumns,

            rowClick: (_, row) => {
              if (!row || !row.select) return

              row?.select()
            },
            rowSelectionChanged: ([data]: any[]) => {
              onGroupSelectionChange(data)
            }
          }}
        />
      </GroupWrapper>

      <RepresentativesWrapper>
        <Table
          options={{
            data: representativesData,
            columns: representativesColumns
          }}
        />
      </RepresentativesWrapper>
    </Wrapper>
  )
}

export { RepresentativesPresenter }
