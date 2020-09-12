import { InvoiceSituations } from 'entities/InvoiceSituations'
import { winthor } from 'libs/knex-winthor'
import { IInvoiceSituationsRepository } from 'repositories/IInvoiceSituationsRepository'

export class WinThorInvoiceSituationsRepository
  implements IInvoiceSituationsRepository {
  async find(
    providerCode: number,
    invoiceNumber: number,
    canceledAt: Date = null
  ): Promise<InvoiceSituations> {
    if (canceledAt) {
      return InvoiceSituations.CANCELED
    }

    let situation = InvoiceSituations.INVOICE_NON_LAUNCHED

    const launchedResult = await winthor.raw(
      `SELECT DTEMISSAO, CHAVENFE, CHAVECTE, NUMBONUS, DTFECHAMENTO, DTFECHAMENTOTOTAL FROM PCNFENT LEFT JOIN PCBONUSC USING (NUMBONUS) WHERE NUMNOTA = ${invoiceNumber} AND CODFORNEC = ${providerCode}`
    )

    if (launchedResult.length === 0) {
      const preLaunchedResult = await winthor.raw(
        `SELECT DTEMISSAO, CHAVENFE, VLTOTAL, VLTOTALNOTA, TOTPESO FROM PCNFENTPREENT WHERE NUMNOTA = ${invoiceNumber} AND CODFORNEC = ${providerCode}`
      )

      if (preLaunchedResult.length !== 0) {
        situation = InvoiceSituations.INVOICE_PRE_LAUNCHED
      }
    } else {
      situation = InvoiceSituations.INVOICE_LAUNCHED

      const { NUMBONUS, DTFECHAMENTO } = launchedResult[0]

      if (NUMBONUS) {
        situation = InvoiceSituations.BONUS_LAUNCHED

        if (DTFECHAMENTO) {
          situation = InvoiceSituations.BONUS_FINISHED

          const osResult = await winthor.raw<
            { NUMOS: number; OSFINALIZADA: string }[]
          >(
            `SELECT DISTINCT PCNFENT.DTENT, PCNFENT.NUMNOTA, PCNFENT.VLTOTAL, PCNFENT.NUMTRANSENT, PCNFENT.CODFILIAL, DECODE(PCMOVENDPEND.POSICAO, 'C', 'SIM', 'NAO') OSFINALIZADA, PCMOVENDPEND.NUMOS FROM PCNFENT, PCWMS, PCMOVENDPEND, PCCONSUM WHERE PCNFENT.NUMTRANSENT = PCWMS.NUMTRANSENT (+) AND PCWMS.NUMTRANSWMS = PCMOVENDPEND.NUMTRANSWMS (+) AND PCNFENT.CODCONT IN (PCCONSUM.CODCONTFOR, PCCONSUM.CODCONTCLI, PCCONSUM.CODCONTDEVCLI, PCCONSUM.CODCONTAJUSTEEST) AND (PCNFENT.VLTOTAL > 0 OR NVL(PCNFENT.OBS, 'X') <> 'NF CANCELADA') AND PCNFENT.TIPODESCARGA NOT IN ('2', '8') AND PCWMS.DTCANCEL IS NULL AND PCMOVENDPEND.DATA > (SELECT DTVIRADAWMS FROM PCCONSUM) AND PCNFENT.CODFILIAL = 1 AND PCNFENT.NUMNOTA = ${invoiceNumber} AND PCNFENT.CODFORNEC = ${providerCode}`
          )

          if (osResult.length) {
            const { NUMOS, OSFINALIZADA } = osResult[0]
            const osFinished = OSFINALIZADA === 'SIM'

            if (NUMOS) {
              situation = InvoiceSituations.OS_GENERATED

              if (osFinished) {
                situation = InvoiceSituations.OS_FINISHED
              }
            }
          }
        }
      }
    }

    return situation
  }
}
