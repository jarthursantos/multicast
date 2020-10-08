import { CellType } from '@shared/web-components/DataGrid/Body/Row/Cell/types'
import { ColumnProps } from '@shared/web-components/DataGrid/types'

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
      title: 'Produto',
      width: 220
    },
    cell: {
      type: CellType.TEXT,
      path: 'name'
    }
  }
]

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
      width: 220
    },
    cell: {
      type: CellType.TEXT,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Janeiro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Fevereiro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Março',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Abril',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Maio',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Junho',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Julho',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Agosto',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Setembro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Outubro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Novembro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  },
  {
    header: {
      title: 'Dezembro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
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
      path: 'january'
    }
  },
  {
    header: {
      title: 'Média Mês',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'january'
    }
  }
]
