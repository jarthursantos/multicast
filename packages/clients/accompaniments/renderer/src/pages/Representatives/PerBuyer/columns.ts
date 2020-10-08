import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

export const buyerColumns: ColumnProps[] = [
  {
    header: {
      title: 'Código',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code'
    }
  },
  {
    header: {
      title: 'Comprador',
      width: 220,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'name'
    }
  }
]

export const representativesColumns: ColumnProps[] = [
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
      width: 250
    },
    cell: {
      type: CellType.TEXT,
      path: 'provider.name'
    }
  },
  {
    header: {
      title: 'Representante',
      width: 200
    },
    cell: {
      type: CellType.TEXT,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Marca',
      width: 150
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
      path: 'provider.cnpj',
      align: 'center'
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
      path: 'provider.city',
      align: 'center'
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
      path: 'provider.state',
      align: 'center'
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
      path: 'phone',
      align: 'center'
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
      path: 'email',
      align: 'center'
    }
  }
]
