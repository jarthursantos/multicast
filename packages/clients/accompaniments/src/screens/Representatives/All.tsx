import React from 'react'

import { Table } from '@shared/web-components/Table'

import { useAllRepresentatives } from './context'

const RepresentativesAll: React.VFC = () => {
  const data = useAllRepresentatives()

  return (
    <Table
      style={{ height: '100%' }}
      options={{
        data,
        columns: [
          {
            title: 'Código',
            width: 80,
            hozAlign: 'right',
            sorter: 'number',
            field: 'provider.code'
          },
          {
            title: 'Fornecedor',
            width: 250,
            sorter: 'string',
            field: 'provider.name'
          },
          {
            title: 'Representante',
            width: 200,
            sorter: 'string',
            field: 'name'
          },
          {
            title: 'Comprador',
            width: 200,
            sorter: 'string',
            field: 'provider.buyer.name'
          },
          {
            title: 'Marca',
            width: 150,
            sorter: 'string',
            field: 'provider.fantasy'
          },
          {
            title: 'Prazo Entega',
            width: 130,
            hozAlign: 'right',
            sorter: 'number',
            field: 'provider.deliveryTime'
          },
          {
            title: 'CNPJ',
            width: 150,
            hozAlign: 'center',
            sorter: 'string',
            field: 'provider.cnpj'
          },
          {
            title: 'Cidade',
            width: 120,
            sorter: 'string',
            field: 'provider.city'
          },
          {
            title: 'Estado',
            width: 80,
            hozAlign: 'center',
            sorter: 'string',
            field: 'provider.state'
          },
          {
            title: 'Telefone',
            width: 120,
            hozAlign: 'center',
            sorter: 'string',
            field: 'phone'
          },
          {
            title: 'E-Mail',
            width: 220,
            sorter: 'string',
            formatter: 'link',
            formatterParams: {
              urlPrefix: 'mailto://'
            },
            field: 'email'
          }
        ]
      }}
    />
  )
}

export { RepresentativesAll }
