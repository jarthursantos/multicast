import { PrismaClient } from '@prisma/client'
import { Accompaniment } from 'entities/Accompaniment'
import { InvoiceBase } from 'entities/Invoice'
import { winthor } from 'libs/knex-winthor'
import { IInvoicesWithoutAccompanimentsRepository } from 'repositories/IInvoicesWithoutAccompanimentsRepository'

export class WinThorInvoicesWithoutAccompanimentsRepository
  implements IInvoicesWithoutAccompanimentsRepository {
  private prisma = new PrismaClient()

  async findMany(accompaniment: Accompaniment): Promise<InvoiceBase[]> {
    const { purchaseOrder, invoiceNumber } = accompaniment
    const { number } = purchaseOrder

    const alreadyTrackedInvoices = await this.prisma.accompaniments.findMany({
      where: { number, NOT: { invoiceNumber } }
    })

    const alreadyTrackedInvoiceNumbers = alreadyTrackedInvoices.map(
      accompaniment => accompaniment.invoiceNumber
    )

    const normalEntry = await winthor.raw<InvoiceBase[]>(`
      SELECT DISTINCT PCMOV.NUMTRANSENT "transactionNumber",
                      PCMOV.NUMNOTA     "number",
                      PCMOV.CODFORNEC   "providerCode",
                      PCNFENT.VLTOTAL   "amountValue",
                      PCNFENT.DTEMISSAO "emittedAt"
      FROM PCMOV LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOV.NUMTRANSENT
      WHERE NUMPED = ${number}
            AND PCMOV.DTCANCEL IS NULL
            AND PCMOV.NUMTRANSENT IS NOT NULL
            AND PCNFENT.ESPECIE = 'NF'
    `)

    const preEntry = await winthor.raw<InvoiceBase[]>(`
      SELECT DISTINCT PCMOVPREENT.NUMTRANSENT "transactionNumber",
                      PCMOVPREENT.NUMNOTA     "number",
                      PCMOVPREENT.CODFORNEC   "providerCode",
                      PCNFENT.VLTOTAL         "amountValue",
                      PCNFENT.DTEMISSAO       "emittedAt"
      FROM PCMOVPREENT LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOVPREENT.NUMTRANSENT
      WHERE NUMPED = ${number}
            AND PCMOVPREENT.DTCANCEL IS NULL
            AND PCMOVPREENT.NUMTRANSENT IS NOT NULL
            AND PCNFENT.ESPECIE = 'NF'
    `)

    const result: InvoiceBase[] = normalEntry

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
  }

  async findByTransaction(transaction: number): Promise<InvoiceBase> {
    const normalEntry = await winthor.raw<InvoiceBase[]>(`
      SELECT DISTINCT PCMOV.NUMTRANSENT "transactionNumber",
                      PCMOV.NUMNOTA     "number",
                      PCMOV.CODFORNEC   "providerCode",
                      PCNFENT.VLTOTAL   "amountValue",
                      PCNFENT.DTEMISSAO "emittedAt"
      FROM PCMOV LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOV.NUMTRANSENT
      WHERE PCMOV.NUMTRANSENT = ${transaction}
            AND PCMOV.DTCANCEL IS NULL
            AND PCNFENT.ESPECIE = 'NF'
    `)

    if (normalEntry.length !== 0) {
      return normalEntry[0]
    }

    const preEntry = await winthor.raw<InvoiceBase[]>(`
      SELECT DISTINCT PCMOVPREENT.NUMTRANSENT "transactionNumber",
                      PCMOVPREENT.NUMNOTA     "number",
                      PCMOVPREENT.CODFORNEC   "providerCode",
                      PCNFENT.VLTOTAL         "amountValue",
                      PCNFENT.DTEMISSAO       "emittedAt"
      FROM PCMOVPREENT LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOVPREENT.NUMTRANSENT
      WHERE PCMOVPREENT.NUMTRANSENT = ${transaction}
            AND PCMOVPREENT.DTCANCEL IS NULL
            AND PCNFENT.ESPECIE = 'NF'
    `)

    return preEntry[0]
  }

  async findByInvoice(
    number: number,
    providerCode: number
  ): Promise<InvoiceBase> {
    const normalEntry = await winthor.raw<InvoiceBase[]>(`
      SELECT DISTINCT PCMOV.NUMTRANSENT "transactionNumber",
                      PCMOV.NUMNOTA     "number",
                      PCMOV.CODFORNEC   "providerCode",
                      PCNFENT.VLTOTAL   "amountValue",
                      PCNFENT.DTEMISSAO "emittedAt"
      FROM PCMOV LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOV.NUMTRANSENT
      WHERE PCMOV.CODFORNEC = ${providerCode}
            AND PCMOV.NUMNOTA = ${number}
            AND PCMOV.DTCANCEL IS NULL
            AND PCNFENT.ESPECIE = 'NF'
    `)

    if (normalEntry.length !== 0) {
      return normalEntry[0]
    }

    const preEntry = await winthor.raw<InvoiceBase[]>(`
      SELECT DISTINCT PCMOVPREENT.NUMTRANSENT "transactionNumber",
                      PCMOVPREENT.NUMNOTA     "number",
                      PCMOVPREENT.CODFORNEC   "providerCode",
                      PCNFENT.VLTOTAL         "amountValue",
                      PCNFENT.DTEMISSAO       "emittedAt"
      FROM PCMOVPREENT LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOVPREENT.NUMTRANSENT
      WHERE PCMOVPREENT.CODFORNEC = ${providerCode}
            AND PCMOVPREENT.NUMNOTA = ${number}
            AND PCMOVPREENT.DTCANCEL IS NULL
            AND PCNFENT.ESPECIE = 'NF'
    `)

    return preEntry[0]
  }
}
