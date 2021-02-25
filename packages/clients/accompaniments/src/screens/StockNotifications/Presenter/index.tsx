import React, { useState } from 'react'

import { IProvider } from '@shared/web-components'
import { Table } from '@shared/web-components/Table'
import { contabilFormatter } from '@shared/web-components/Table'

import { Wrapper, GroupWrapper, ProductsWrapper } from './styles'
import { StockNotificationsPresenterProps } from './types'

const StockNotificationPresenter: React.VFC<StockNotificationsPresenterProps> = ({
  productsColumns,
  providers,
  products,
  onChangeSelection
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
            data: providers,
            height: '100%',
            rowClick: (_, row) => row?.select(),
            rowSelectionChanged: (data: IProvider[]) => {
              onChangeSelection(data[0])
            },
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
            data: products,
            columns: [
              ...productsColumns,
              {
                title: 'Código',
                width: 100,
                hozAlign: 'center',
                sorter: 'number',
                field: 'code',
                bottomCalc: 'count'
              },
              {
                title: 'Cód. Fab.',
                width: 120,
                hozAlign: 'center',
                sorter: 'string',
                field: 'factoryCode'
              },
              {
                title: 'Descrição',
                width: 300,
                sorter: 'string',
                field: 'description'
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
                sorter: 'datetime',
                sorterParams: {
                  format: 'YYYY-MM-DD'
                },
                hozAlign: 'center',
                formatter: 'datetime',
                formatterParams: {
                  inputFormat: 'YYYY-MM-DD',
                  outputFormat: 'DD/MM/YYYY',
                  invalidPlaceholder: '-'
                },
                field: 'lastPurchaseOrderAt'
              },
              {
                title: 'Vl. Últ. Entrada',
                width: 150,
                hozAlign: 'center',
                sorter: 'number',
                field: 'lastBuyPrice',
                formatter: contabilFormatter,
                bottomCalc: 'sum',
                bottomCalcFormatter: contabilFormatter
              },
              {
                title: 'Qt. Últ. Entrada',
                width: 150,
                hozAlign: 'center',
                sorter: 'number',
                field: 'lastEntryQuantity'
              }
            ]
          }}
        />
      </ProductsWrapper>
    </Wrapper>
  )
}

export { StockNotificationPresenter }
