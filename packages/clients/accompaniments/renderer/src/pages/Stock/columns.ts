import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

export const providerColumns: ColumnProps[] = [
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
      title: 'Fornecedor',
      width: 220,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'name'
    }
  }
]

export const productColumns: ColumnProps[] = [
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
      title: 'Cód. Fab.',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      align: 'center',
      path: 'code'
    }
  },
  {
    header: {
      title: 'Descrição',
      width: 300,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Embalagem',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'packing',
      align: 'center'
    }
  },
  {
    header: {
      title: 'Unidade',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'unity',
      align: 'center'
    }
  },
  {
    header: {
      title: 'Últ. Pedido',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'lastPurchaseOrderAt'
    }
  },
  {
    header: {
      title: 'Vl. Últ. Entrada',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'valueLastArrival'
    }
  },
  {
    header: {
      title: 'Qt. Últ. Entrada',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'quantityLastArrival'
    }
  }
]
