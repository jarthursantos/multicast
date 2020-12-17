import React, { useState, useCallback, useMemo } from 'react'

import { PDFViewer } from '@shared/web-components'

import { InvoiceSituations } from '~/store/modules/schedules/types'

import { InvoiceProducts } from './Products'
import { Container, TabBar, TabButton, TabContainer, Wrapper } from './styles'
import { IInvoiceAttachmentsProps, Tabs } from './types'

const InvoiceAttachments: React.VFC<IInvoiceAttachmentsProps> = ({
  invoice
}) => {
  const [currentTab, setCurrentTab] = useState<Tabs>(undefined)

  const haveDataToShow = useMemo<boolean>(() => {
    if (invoice) {
      if (invoice.situation !== InvoiceSituations.INVOICE_NON_LAUNCHED) {
        setCurrentTab(Tabs.PRODUCTS)
        return true
      }

      if (invoice.invoiceFile) {
        setCurrentTab(Tabs.INVOICE)
        return true
      }

      if (invoice.cteFile) {
        setCurrentTab(Tabs.CTE)
        return true
      }
    }

    return false
  }, [invoice])

  const handleChangeCurrentTab = useCallback(
    (tab: Tabs) => () => setCurrentTab(tab),
    []
  )

  return (
    <>
      {haveDataToShow && (
        <Wrapper>
          <TabBar>
            {invoice?.situation !== InvoiceSituations.INVOICE_NON_LAUNCHED && (
              <TabButton
                active={currentTab === Tabs.PRODUCTS}
                onClick={handleChangeCurrentTab(Tabs.PRODUCTS)}
              >
                Produtos
              </TabButton>
            )}

            {invoice.invoiceFile && (
              <TabButton
                active={currentTab === Tabs.INVOICE}
                onClick={handleChangeCurrentTab(Tabs.INVOICE)}
              >
                Nota Fiscal
              </TabButton>
            )}

            {invoice.cteFile && (
              <TabButton
                active={currentTab === Tabs.CTE}
                onClick={handleChangeCurrentTab(Tabs.CTE)}
              >
                CTe
              </TabButton>
            )}
          </TabBar>

          <Container>
            {invoice.cteFile && (
              <TabContainer visible={currentTab === Tabs.CTE}>
                <PDFViewer
                  width={600}
                  height={455}
                  name={invoice.cteFile.filename}
                  url={invoice.cteFile.url}
                />
              </TabContainer>
            )}

            {invoice.invoiceFile && (
              <TabContainer visible={currentTab === Tabs.INVOICE}>
                <PDFViewer
                  width={600}
                  height={541}
                  name={invoice.invoiceFile.filename}
                  url={invoice.invoiceFile.url}
                />
              </TabContainer>
            )}

            {invoice?.situation !== InvoiceSituations.INVOICE_NON_LAUNCHED && (
              <TabContainer visible={currentTab === Tabs.PRODUCTS}>
                <InvoiceProducts invoice={invoice} />
              </TabContainer>
            )}
          </Container>
        </Wrapper>
      )}
    </>
  )
}

export { InvoiceAttachments }
