import React, { useState } from 'react'

import { useRepresentativesPerBuyer } from './context'
import { RepresentativesPresenter } from './Presenter'
import { Representative, BuyerRepresentativeGroup } from './types'

const RepresentativesBuyer: React.FC = () => {
  const data = useRepresentativesPerBuyer()

  const [representatives, setRepresentatives] = useState<Representative[]>([])

  return (
    <RepresentativesPresenter
      onGroupSelectionChange={(selection: BuyerRepresentativeGroup) => {
        setRepresentatives(selection?.representatives || [])
      }}
      groupData={data}
      groupColumns={[
        {
          title: 'Código',
          field: 'code',
          width: 80,
          sorter: 'number',
          hozAlign: 'right',
          resizable: false
        },
        {
          title: 'Comprador',
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
          title: 'Representante',
          width: 200,
          sorter: 'string',
          field: 'name'
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

export { RepresentativesBuyer }
