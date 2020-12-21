import React, { useState, useMemo, useCallback } from 'react'
import { MdAssignmentTurnedIn, MdAssignmentLate } from 'react-icons/md'
import Loading from 'react-loading'
import { useDispatch } from 'react-redux'

import { useWatchAction } from '@shared/action-watcher'
import { NumberInput, TextInput } from '@shared/web-components/Form'

import {
  markScheduleInvoiceAsReceivedRequest,
  markScheduleInvoiceAsNonReceivedRequest
} from '~/store/modules/schedules/actions'
import {
  Types,
  InvoiceDivergence,
  IMarkScheduleInvoiceAsReceivedSuccessAction,
  IMarkScheduleInvoiceAsNonReceivedSuccessAction
} from '~/store/modules/schedules/types'

import DivergenceField from './DivergenceField'
import {
  Wrapper,
  Container,
  Actions,
  Inline,
  IconButton,
  FillSpace,
  TicketIndicatorRight,
  TicketIndicatorLeft,
  HiddenFields
} from './styles'
import { IReceiptInvoiceItemProps } from './types'

const ReceiptInvoiceItem: React.FC<IReceiptInvoiceItemProps> = ({
  index,
  invoice,
  schedule,
  receiptPerInvoice,
  canChangeSituation
}) => {
  const dispatch = useDispatch()

  const [divergence, setDivergence] = useState<InvoiceDivergence>(
    invoice.divergence
  )

  const [receivingInvoice, setReceivingInvoice] = useState(false)
  const [nonReceivingInvoice, setNonReceivingInvoice] = useState(false)

  const currentAppearence = useMemo(() => {
    switch (divergence) {
      case InvoiceDivergence.RECEIVED:
        return 'received'
      case InvoiceDivergence.NOT_RECEIVED:
        return 'not-received'
      case InvoiceDivergence.ADDED:
        return 'added'
      default:
        return ''
    }
  }, [divergence])

  const handleReceive = useCallback(() => {
    setReceivingInvoice(true)
    dispatch(markScheduleInvoiceAsReceivedRequest(schedule, invoice))
  }, [dispatch, schedule, invoice])

  const handleNonReceive = useCallback(() => {
    setNonReceivingInvoice(true)
    dispatch(markScheduleInvoiceAsNonReceivedRequest(schedule, invoice))
  }, [dispatch, schedule, invoice])

  useWatchAction<IMarkScheduleInvoiceAsReceivedSuccessAction>(
    ({ payload }) => {
      if (payload.invoice.id !== invoice.id) return

      setReceivingInvoice(false)
      setDivergence(InvoiceDivergence.RECEIVED)
    },
    Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_SUCCESS,
    [invoice]
  )

  useWatchAction<IMarkScheduleInvoiceAsNonReceivedSuccessAction>(
    ({ payload }) => {
      if (payload.invoice.id !== invoice.id) return

      setNonReceivingInvoice(false)
      setDivergence(InvoiceDivergence.NOT_RECEIVED)
    },
    Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_SUCCESS,
    [invoice]
  )

  return (
    <Wrapper className={currentAppearence}>
      <HiddenFields>
        <TextInput
          inputProps={{ disabled: true }}
          name={`invoices[${index}].id`}
          label="Fornecedor"
        />

        <DivergenceField divergence={divergence} index={index} />
      </HiddenFields>

      <Container className={currentAppearence}>
        <Inline>
          <NumberInput
            name={`invoices[${index}].number`}
            label="Número"
            inputProps={{ disabled: true }}
          />
          <TextInput
            inputProps={{ disabled: true }}
            name={`invoices[${index}].provider.name`}
            label="Fornecedor"
          />
        </Inline>
      </Container>

      <Actions className={currentAppearence}>
        <TextInput
          className="inputs"
          name={`invoices[${index}].dischargeValue`}
          label="Valor da Descarga"
          style={{ width: 115 }}
          inputProps={{ disabled: true, style: { textAlign: 'right' } }}
        />

        {receiptPerInvoice && divergence !== InvoiceDivergence.NOT_RECEIVED && (
          <NumberInput
            className="inputs"
            name={`invoices[${index}].receiptValue`}
            label="Valor do Recibo"
            style={{ width: 115 }}
            double
          />
        )}

        <FillSpace />

        {divergence !== InvoiceDivergence.ADDED && canChangeSituation && (
          <>
            <IconButton
              onClick={handleNonReceive}
              className={`negative ${
                divergence === InvoiceDivergence.NOT_RECEIVED && 'active'
              }`}
            >
              {nonReceivingInvoice ? (
                <Loading type="spin" color="#db4437" width={24} height={24} />
              ) : (
                <MdAssignmentLate />
              )}
              <strong>Não Veio</strong>
            </IconButton>

            <IconButton
              onClick={handleReceive}
              className={`positive ${
                divergence === InvoiceDivergence.RECEIVED && 'active'
              }`}
            >
              {receivingInvoice ? (
                <Loading type="spin" color="#2f8f37" width={24} height={24} />
              ) : (
                <MdAssignmentTurnedIn />
              )}
              <strong>Veio</strong>
            </IconButton>
          </>
        )}

        <TicketIndicatorLeft className={currentAppearence} />
        <TicketIndicatorRight className={currentAppearence} />
      </Actions>
    </Wrapper>
  )
}

export { ReceiptInvoiceItem }
