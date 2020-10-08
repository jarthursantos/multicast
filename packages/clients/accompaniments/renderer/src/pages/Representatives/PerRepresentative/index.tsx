import React, { useEffect, useState } from 'react'

import { DataGrid, SplitContainer } from '@shared/web-components'

import { useRepresentedPerRepresentative } from '../context'
import { Representative, RepresentedRepresentativeGroup } from '../types'
import { representativeColumns, providersColumns } from './columns'

const PerRepresentative: React.FC = () => {
  const data = useRepresentedPerRepresentative()

  const [selection, setSelection] = useState<RepresentedRepresentativeGroup>()
  const [representatives, setRepresentatives] = useState<Representative[]>([])

  useEffect(() => {
    if (!selection) {
      return
    }

    setRepresentatives(selection.representatives)
  }, [selection])

  return (
    <SplitContainer resizeLocation="left" resizeWidth={300}>
      <DataGrid<RepresentedRepresentativeGroup>
        keyBinding="code"
        data={data}
        onRowClick={setSelection}
        columns={representativeColumns}
        resolveRowStyle={() => ({})}
      />

      <DataGrid<Representative>
        keyBinding="provider.code"
        data={representatives}
        columns={providersColumns}
        resolveRowStyle={() => ({})}
      />
    </SplitContainer>
  )
}

export default PerRepresentative
