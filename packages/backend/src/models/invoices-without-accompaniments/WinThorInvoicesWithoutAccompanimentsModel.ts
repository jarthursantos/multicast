import { PrismaClient } from '@prisma/client'

import { IAccompaniment } from '~/domain/IAccompaniment'
import { IInvoiceBase } from '~/domain/IInvoice'
import { winthor } from '~/libraries/WinThor'

import { IInvoicesWithoutAccompanimentsModel } from './IInvoicesWithoutAccompanimentsModel'

export function createWinThorInvoicesWithoutAccompanimentsModel(): IInvoicesWithoutAccompanimentsModel {
  const prisma = new PrismaClient()

  return {
    async findMany(accompaniment: IAccompaniment): Promise<IInvoiceBase[]> {
      const { purchaseOrder, invoiceNumber } = accompaniment
      const { number } = purchaseOrder

      const alreadyTrackedInvoices = await prisma.accompaniments.findMany({
        where: { number, NOT: { invoiceNumber } }
      })

      const alreadyTrackedInvoiceNumbers = alreadyTrackedInvoices.map(
        accompaniment => accompaniment.invoiceNumber
      )

      const normalEntry = await winthor.raw<IInvoiceBase[]>(`
        SELECT DISTINCT PCMOV.NUMTRANSENT "transactionNumber",
                        PCMOV.NUMNOTA     "number",
                        PCMOV.CODFORNEC   "providerCode",
                        PCNFENT.VLTOTAL   "amountValue",
                        PCNFENT.DTEMISSAO "emittedAt"
        FROM PCMOV LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOV.NUMTRANSENT
        WHERE NUMPED = ${number}
              AND PCMOV.DTCANCEL IS NULL
              AND PCMOV.NUMTRANSENT IS NOT NULL
      `)

      const preEntry = await winthor.raw<IInvoiceBase[]>(`
        SELECT DISTINCT PCMOVPREENT.NUMTRANSENT "transactionNumber",
                        PCMOVPREENT.NUMNOTA     "number",
                        PCMOVPREENT.CODFORNEC   "providerCode",
                        PCNFENT.VLTOTAL         "amountValue",
                        PCNFENT.DTEMISSAO       "emittedAt"
        FROM PCMOVPREENT LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOVPREENT.NUMTRANSENT
        WHERE NUMPED = ${number}
              AND PCMOVPREENT.DTCANCEL IS NULL
              AND PCMOVPREENT.NUMTRANSENT IS NOT NULL
      `)

      const result: IInvoiceBase[] = normalEntry

      preEntry.forEach(entry => {
        const entryExists = normalEntry.find(
          addedEntry => addedEntry.transactionNumber === entry.transactionNumber
        )

        if (!entryExists) {
          result.push(entry)
        }
      })

      const resultWithoutTracked = result.filter(entry => {
        const tracked = alreadyTrackedInvoiceNumbers.find(
          tracked => tracked === entry.number
        )

        return !tracked
      })

      return resultWithoutTracked.map(entry => ({
        ...entry,
        amountValue: entry.amountValue || 0
      }))
    },

    async findByTransaction(transaction: number): Promise<IInvoiceBase> {
      const normalEntry = await winthor.raw<IInvoiceBase[]>(`
        SELECT DISTINCT PCMOV.NUMTRANSENT "transactionNumber",
                        PCMOV.NUMNOTA     "number",
                        PCMOV.CODFORNEC   "providerCode",
                        PCNFENT.VLTOTAL   "amountValue",
                        PCNFENT.DTEMISSAO "emittedAt"
        FROM PCMOV LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOV.NUMTRANSENT
        WHERE PCMOV.NUMTRANSENT = ${transaction}
              AND PCMOV.DTCANCEL IS NULL
      `)

      if (normalEntry.length !== 0 && normalEntry[0].transactionNumber) {
        return normalEntry[0]
      }

      const preEntry = await winthor.raw<IInvoiceBase[]>(`
        SELECT DISTINCT PCMOVPREENT.NUMTRANSENT "transactionNumber",
                        PCMOVPREENT.NUMNOTA     "number",
                        PCMOVPREENT.CODFORNEC   "providerCode",
                        PCNFENT.VLTOTAL         "amountValue",
                        PCNFENT.DTEMISSAO       "emittedAt"
        FROM PCMOVPREENT LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOVPREENT.NUMTRANSENT
        WHERE PCMOVPREENT.NUMTRANSENT = ${transaction}
              AND PCMOVPREENT.DTCANCEL IS NULL
      `)

      return preEntry[0]
    },

    async findByInvoice(
      number: number,
      providerCode: number
    ): Promise<IInvoiceBase> {
      const normalEntry = await winthor.raw<IInvoiceBase[]>(`
        SELECT DISTINCT PCMOV.NUMTRANSENT "transactionNumber",
                        PCMOV.NUMNOTA     "number",
                        PCMOV.CODFORNEC   "providerCode",
                        PCNFENT.VLTOTAL   "amountValue",
                        PCNFENT.DTEMISSAO "emittedAt"
        FROM PCMOV LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOV.NUMTRANSENT
        WHERE PCMOV.CODFORNEC = ${providerCode}
              AND PCMOV.NUMNOTA = ${number}
              AND PCMOV.DTCANCEL IS NULL
              AND PCMOV.NUMTRANSENT IS NOT NULL
      `)

      if (normalEntry.length !== 0 && normalEntry[0].transactionNumber) {
        return normalEntry[0]
      }

      const preEntry = await winthor.raw<IInvoiceBase[]>(`
        SELECT DISTINCT PCMOVPREENT.NUMTRANSENT "transactionNumber",
                        PCMOVPREENT.NUMNOTA     "number",
                        PCMOVPREENT.CODFORNEC   "providerCode",
                        PCNFENT.VLTOTAL         "amountValue",
                        PCNFENT.DTEMISSAO       "emittedAt"
        FROM PCMOVPREENT LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOVPREENT.NUMTRANSENT
        WHERE PCMOVPREENT.CODFORNEC = ${providerCode}
              AND PCMOVPREENT.NUMNOTA = ${number}
              AND PCMOVPREENT.DTCANCEL IS NULL
              AND PCMOVPREENT.NUMTRANSENT IS NOT NULL
      `)

      return preEntry[0]
    }
  }
}
