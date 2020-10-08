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
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Fevereiro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Março',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Abril',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Maio',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Junho',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Julho',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Agosto',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Setembro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Outubro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Novembro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Dezembro',
      width: 100,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Valor Total',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  },
  {
    header: {
      title: 'Média Mês',
      width: 120,
      align: 'center'
    },
    cell: {
      type: CellType.NUMBER,
      path: 'january',
      fractionDigits: 2
    }
  }
]
