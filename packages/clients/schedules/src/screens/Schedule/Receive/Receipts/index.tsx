import React from 'react'

import { ReceiptInvoiceItem } from './InvoiceItem'
import { Wrapper } from './styles'
import { IReceiptsProps } from './types'

const Receipts: React.VFC<IReceiptsProps> = ({
  schedule,
  receiptPerInvoice
}) => {
  return (
    <Wrapper>
      {schedule?.invoices
        .filter(invoice => !invoice.canceledAt)
        .map((invoice, index) => (
          <ReceiptInvoiceItem
            key={invoice.number}
            index={index}
            invoice={invoice}
            schedule={schedule}
            receiptPerInvoice={receiptPerInvoice}
            canChangeSituation={!schedule?.receivedAt}
          />
        ))}
    </Wrapper>
  )
}

export { Receipts }
