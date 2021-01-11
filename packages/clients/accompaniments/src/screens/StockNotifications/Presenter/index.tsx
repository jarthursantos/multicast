import React, { useState } from 'react'

import { Table } from '@shared/web-components/Table'

import { Wrapper, GroupWrapper, ProductsWrapper } from './styles'
import { StockNotificationsPresenterProps } from './types'

const StockNotificationPresenter: React.VFC<StockNotificationsPresenterProps> = ({
  productsColumns
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
            data: [{ code: 83, name: 'Tintas Lux' }],
            columns: [
              {
                title: 'Código',
                field: 'code',
                width: 80,
                sorter: 'number',
                hozAlign: 'right',
                resizable: false
              },
              {
                title: 'Fornecedor',
                field: 'name',
                widthGrow: 1,
                widthShrink: 1,
                sorter: 'string',
                resizable: false
              }
            ]
          }}
        />
      </GroupWrapper>

      <ProductsWrapper>
        <Table
          options={{
            data: [],
            columns: [
              ...productsColumns,
              {
                title: 'Código',
                width: 80,
                hozAlign: 'center',
                sorter: 'number',
                field: 'code'
              },
              {
                title: 'Cód. Fab.',
                width: 100,
                hozAlign: 'center',
                sorter: 'string',
                field: 'code'
              },
              {
                title: 'Descrição',
                width: 300,
                hozAlign: 'center',
                sorter: 'string',
                field: 'name'
              },
              {
                title: 'Embalagem',
                width: 120,
                hozAlign: 'center',
                sorter: 'string',
                field: 'packing'
              },
              {
                title: 'Unidade',
                width: 120,
                hozAlign: 'center',
                sorter: 'string',
                field: 'unity'
              },
              {
                title: 'Últ. Pedido',
                width: 120,
                hozAlign: 'center',
                sorter: 'datetime',
                field: 'lastPurchaseOrderAt'
              },
              {
                title: 'Vl. Últ. Entrada',
                width: 150,
                hozAlign: 'center',
                sorter: 'number',
                field: 'valueLastArrival'
              },
              {
                title: 'Qt. Últ. Entrada',
                width: 150,
                hozAlign: 'center',
                sorter: 'number',
                field: 'quantityLastArrival'
              }
            ]
          }}
        />
      </ProductsWrapper>
    </Wrapper>
  )
}

export { StockNotificationPresenter }
