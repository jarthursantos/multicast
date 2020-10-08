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
      path: 'code'
    }
  },
  {
    header: {
      title: 'Descrição',
      width: 300
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
      path: 'name'
    }
  },
  {
    header: {
      title: 'Unidade',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.TEXT,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Estoque Inicial',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Entradas',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Saídas',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Estoque Atual - Calculado',
      width: 170,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Estoque Atual - Sistema',
      width: 170,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Quantidade',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Valor Total',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  }
]
