import React, { useState } from 'react'

import { useRepresentedPerRepresentative } from './context'
import { RepresentativesPresenter } from './Presenter'
import { Representative, RepresentedRepresentativeGroup } from './types'

const RepresentativesRepresentative: React.FC = () => {
  const data = useRepresentedPerRepresentative()

  const [representatives, setRepresentatives] = useState<Representative[]>([])

  return (
    <RepresentativesPresenter
      onGroupSelectionChange={(selection: RepresentedRepresentativeGroup) => {
        setRepresentatives(selection?.representatives || [])
      }}
      groupData={data}
      groupColumns={[
        {
          title: 'Representante',
          field: 'name',
          widthGrow: 1,
          widthShrink: 1,
          sorter: 'string',
          resizable: false
        }
      ]}
      representativesData={representatives}
      representativesColumns={[
        {
          title: 'Código',
          width: 80,
          hozAlign: 'center',
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
      ]}
    />
  )
}

export { RepresentativesRepresentative }
