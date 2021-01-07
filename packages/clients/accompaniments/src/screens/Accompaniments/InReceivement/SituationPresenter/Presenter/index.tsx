import React, { useMemo, useState } from 'react'

import { cloneDeep } from 'lodash'

import { ProductsContainer } from '~/components/ProductsContainer'
import { Accompaniment } from '~/store/modules/accompaniments/types'

import { ReceivementSituationTable } from '../../SituationTable'
import { ReceivementSituationTableProps } from '../../SituationTable/types'
import { Container, TableWrapper } from './styles'

type Props = Omit<ReceivementSituationTableProps, 'onSelectionChange'>

const Presenter: React.VFC<Props> = ({ data, columns, tab }) => {
  const [productsWidth, setProductsWidth] = useState(300)
  const [selectedRow, setSelectedRow] = useState<Accompaniment>()

  const accompaniments = useMemo(() => data.map(cloneDeep), [data])

  return (
    <Container productsWidth={productsWidth}>
      <TableWrapper>
        <ReceivementSituationTable
          data={accompaniments}
          columns={columns}
          tab={tab}
          onSelectionChange={setSelectedRow}
        />
      </TableWrapper>

      <ProductsContainer
        accompanimentId={selectedRow?.id}
        onResize={setProductsWidth}
      />
    </Container>
  )
}

export { Presenter }
