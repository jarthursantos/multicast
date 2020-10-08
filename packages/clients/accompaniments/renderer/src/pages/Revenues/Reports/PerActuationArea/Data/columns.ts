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
      title: 'Área de Atuação',
      width: 200
    },
    cell: {
      type: CellType.TEXT,
      path: 'code'
    }
  },
  {
    header: {
      title: 'Qt. Pedidos',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code'
    }
  },
  {
    header: {
      title: 'Valor Venda',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'code'
    }
  },
  {
    header: {
      title: '% Part. Vendas',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: '% Descontos',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: '% Lucro',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Qt. Média Items',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Valor Tabela',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'code'
    }
  },
  {
    header: {
      title: 'Valor CMV',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'code'
    }
  },
  {
    header: {
      title: 'Valor Lucro',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'code'
    }
  },
  {
    header: {
      title: '% M.C.',
      width: 80,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Peso (kg)',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'MIX',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code'
    }
  }
]