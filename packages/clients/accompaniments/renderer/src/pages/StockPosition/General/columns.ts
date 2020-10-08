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
      title: 'Classe',
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
      title: 'Qt. Estoque',
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
      title: 'Qt. Estoque CX',
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
      title: 'Custo + ICMS Unit.',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Custo Real Unit.',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Custo Financeiro Unit.',
      width: 170,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Preço Venda Unit.',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Preçõ Úli. Ent. Unit.',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Custo Próx. Compra',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Valor Custo + ICMS',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Valor Custo Real',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Valor Custo Financeiro',
      width: 170,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Valor Últ. Ent.',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Qt Últ. Ent.',
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
      title: 'Valor Preço Venda',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Última Entrada',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.DATE,
      path: 'name'
    }
  },
  {
    header: {
      title: 'Cód. Fab.',
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
      title: 'Custo Últ. Ent.',
      width: 150,
      align: 'center'
    },
    cell: {
      type: CellType.CONTABIL,
      path: 'name'
    }
  },
  {
    header: {
      title: 'NCM',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'name'
    }
  }
]
