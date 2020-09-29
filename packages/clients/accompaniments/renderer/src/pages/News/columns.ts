import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

export const columns: ColumnProps[] = [
  {
    header: {
      title: 'Nº Pedido',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'key'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Cód. Fornec.',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Fornecedor',
      width: 250,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Emissão',
      width: 90,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Atraso (Dias)',
      width: 110,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Marca',
      width: 120,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Valor Total',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Comprador',
      width: 200,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Transportadora',
      width: 200,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Frete',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  },
  {
    header: {
      title: 'Representante',
      width: 200,
      align: 'left'
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    },
    footer: {
      value: '1'
    }
  }
]
