import React from 'react'

import { useDownloadedAccompaniments } from '~/store/context'

import { InReceivementTabs } from '../types'
import { downloadedColumns } from './columns'
import { Presenter } from './Presenter'

const DownloadedSituationPresenter: React.VFC = () => {
  const accompaniments = useDownloadedAccompaniments()

  return (
    <Presenter
      data={accompaniments}
      columns={downloadedColumns}
      tab={InReceivementTabs.DOWNLOADED}
    />
  )
}

export { DownloadedSituationPresenter }
