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
      title: 'Supervisor',
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
      title: 'Qt. Clientes',
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
      title: 'Qt. RCAs',
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
      title: 'Valor Meta',
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
      title: '% Meta',
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
      title: 'Projeção de Vendas',
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
      title: 'Valor Bonificação',
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
      title: '% Bonificação',
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
      title: 'Valor CMV Real',
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
      title: 'Qt. Items',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'code'
    }
  },
  {
    header: {
      title: 'Prazo Médio',
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