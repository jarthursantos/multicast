import React from 'react'

import { PDFViewer } from '@shared/web-components'

import { Container } from './styles'
import { IReceiptScreenProps } from './types'

const ReceiptScreen: React.VFC<IReceiptScreenProps> = ({ filename, url }) => {
  return (
    <Container>
      <PDFViewer name={filename} url={url} height="100%" width="100%" />
    </Container>
  )
}

export { ReceiptScreen }
