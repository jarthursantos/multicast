import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

export const columns: ColumnProps[] = [
  {
    header: {
      title: 'Código',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'provider.code'
    }
  },
  {
    header: {
      title: 'Fornecedor',
      width: 250,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'provider.name'
    }
  },
  {
    header: {
      title: 'Representante',
      width: 200,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Comprador',
      width: 200,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'provider.buyer.name'
    }
  },
  {
    header: {
      title: 'Marca',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'provider.fantasy'
    }
  },
  {
    header: {
      title: 'Prazo Entega',
      width: 110,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'provider.deliveryTime'
    }
  },
  {
    header: {
      title: 'CNPJ',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'provider.cnpj'
    }
  },
  {
    header: {
      title: 'Cidade',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'provider.city'
    }
  },
  {
    header: {
      title: 'Estado',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'provider.state'
    }
  },
  {
    header: {
      title: 'Telefone',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'phone'
    }
  },
  {
    header: {
      title: 'E-Mail',
      width: 220,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'email'
    }
  }
]
