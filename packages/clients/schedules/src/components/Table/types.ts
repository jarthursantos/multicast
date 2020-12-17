import React from 'react'

import { Options } from 'tabulator-tables'

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  options: Options
}
