import { PrismaClient } from '@prisma/client'
import { Accompaniment } from 'entities/Accompaniment'
import { InvoiceBase } from 'entities/Invoice'
import { winthor } from 'libs/knex-winthor'
import { IInvoicesWithoutAccompanimentsRepository } from 'repositories/IInvoicesWithoutAccompanimentsRepository'

// TODO: remove already tracked invoices

export class WinThorInvoicesWithoutAccompanimentsRepository
  implements IInvoicesWithoutAccompanimentsRepository {
  private prisma = new PrismaClient()

  async findMany(accompaniment: Accompaniment): Promise<InvoiceBase[]> {
    const { number } = accompaniment.purchaseOrder

    const alreadyTrackedInvoices = await this.prisma.accompaniments.findMany({
      where: { number }
    })

    console.log({ alreadyTrackedInvoices })

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

    return result
  }
}

// SELECT DISTINCT PCMOV.NUMTRANSENT, PCMOV.NUMNOTA, PCNFENT.VLTOTAL, PCNFENT.DTEMISSAO
// FROM PCMOV
// LEFT JOIN PCNFENT ON PCNFENT.NUMTRANSENT = PCMOV.NUMTRANSENT
// WHERE NUMPED = 15961
//   AND PCMOV.DTCANCEL IS NULL
//   AND PCMOV.NUMTRANSENT IS NOT NULL;
