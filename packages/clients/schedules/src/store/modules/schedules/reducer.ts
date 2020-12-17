import { toast } from 'react-toastify'

import { remote } from 'electron'
import produce from 'immer'

import { SchedulesActionTypes, SchedulesState, Types } from './types'

const INITIAL_STATE: SchedulesState = {
  schedules: [],

  additingSchedule: false,
  updatingSchedule: false,
  reschedulingSchedule: false,
  deletingSchedules: false,
  cancelingSchedules: false,
  closingSchedules: false,
  loadingSchedules: false,

  additingScheduleInvoice: false,
  updatingScheduleInvoice: false,
  deletingScheduleInvoice: false,
  cancelingScheduleInvoice: false,
  movingScheduleInvoice: false,
  markingScheduleInvoiceAsReceived: false,
  markingScheduleInvoiceAsNonReceived: false
}

export default function schedules(
  state = INITIAL_STATE,
  action: SchedulesActionTypes
) {
  return produce(state, draft => {
    switch (action.type) {
      // #region Filters
      case Types.APPLY_SCHEDULE_FILTERS: {
        draft.filters = action.payload.filters

        break
      }
      case Types.CLEAR_SCHEDULE_FILTERS: {
        draft.filters = undefined

        break
      }
      // #endregion

      // #region Add
      case Types.ADD_SCHEDULES_SUCCESS: {
        draft.schedules.push(action.payload.schedule)
        draft.additingSchedule = false

        toast.success('Agendamento adicionado')

        break
      }
      case Types.ADD_SCHEDULES_REQUEST: {
        draft.additingSchedule = true

        break
      }
      case Types.ADD_SCHEDULES_FAILURE: {
        draft.additingSchedule = false

        remote?.dialog.showErrorBox(
          'Error ao adicionar agendamento',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Update
      case Types.UPDATE_SCHEDULES_SUCCESS: {
        draft.schedules = draft.schedules.filter(({ id }) => {
          return id !== action.payload.schedule.id
        })

        draft.schedules.push(action.payload.updatedSchedule)
        draft.updatingSchedule = false

        toast.success('Agendamento atualizado')

        break
      }
      case Types.UPDATE_SCHEDULES_REQUEST: {
        draft.updatingSchedule = true

        break
      }
      case Types.UPDATE_SCHEDULES_FAILURE: {
        draft.updatingSchedule = false

        remote?.dialog.showErrorBox(
          'Error ao atualizar agendamento',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Reschedule
      case Types.RESCHEDULE_SCHEDULES_SUCCESS: {
        draft.schedules = draft.schedules.filter(({ id }) => {
          return (
            id !== action.payload.schedule.id &&
            id !== action.payload.rescheduledSchedule.id
          )
        })

        draft.schedules.push(action.payload.schedule)
        draft.schedules.push(action.payload.rescheduledSchedule)
        draft.reschedulingSchedule = false

        toast.success('Agendamento reagendado')

        break
      }
      case Types.RESCHEDULE_SCHEDULES_REQUEST: {
        draft.reschedulingSchedule = true

        break
      }
      case Types.RESCHEDULE_SCHEDULES_FAILURE: {
        draft.reschedulingSchedule = false

        remote?.dialog.showErrorBox(
          'Error ao reagendar agendamento',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Delete
      case Types.DELETE_SCHEDULES_SUCCESS: {
        draft.schedules = draft.schedules.filter(({ id }) => {
          return id !== action.payload.schedule.id
        })

        draft.deletingSchedules = false

        toast.success('Agendamento apagado')

        break
      }
      case Types.DELETE_SCHEDULES_REQUEST: {
        draft.deletingSchedules = true

        break
      }
      case Types.DELETE_SCHEDULES_FAILURE: {
        draft.deletingSchedules = false

        remote?.dialog.showErrorBox(
          'Error ao apagar agendamento',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Cancel
      case Types.CANCEL_SCHEDULES_SUCCESS: {
        const { canceledSchedule, schedule } = action.payload

        draft.schedules = draft.schedules.filter(({ id }) => {
          return id !== schedule.id
        })

        draft.schedules.push(canceledSchedule)
        draft.cancelingSchedules = false

        toast.success('Agendamento cancelado')

        break
      }
      case Types.CANCEL_SCHEDULES_REQUEST: {
        draft.cancelingSchedules = true

        break
      }
      case Types.CANCEL_SCHEDULES_FAILURE: {
        draft.cancelingSchedules = false

        remote?.dialog.showErrorBox(
          'Error ao cancelar agendamento',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Close
      case Types.CLOSE_SCHEDULES_SUCCESS: {
        const { schedule, closedSchedule } = action.payload

        draft.schedules = draft.schedules.filter(({ id }) => {
          return id !== schedule.id || id !== closedSchedule.id
        })

        draft.schedules.push(closedSchedule)
        draft.closingSchedules = false

        toast.success('Agendamento fechado')

        break
      }
      case Types.CLOSE_SCHEDULES_REQUEST: {
        draft.closingSchedules = true

        break
      }
      case Types.CLOSE_SCHEDULES_FAILURE: {
        draft.closingSchedules = false

        remote?.dialog.showErrorBox(
          'Error ao fechar agendamento',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Add Invoice
      case Types.ADD_SCHEDULE_INVOICES_SUCCESS: {
        const index = draft.schedules.findIndex(
          schedule => schedule.id === action.payload.schedule.id
        )

        if (index !== -1) {
          if (!draft.schedules[index].invoices) {
            draft.schedules[index].invoices = []
          }

          draft.schedules[index].invoices.push(action.payload.invoice)

          draft.additingScheduleInvoice = false

          toast.success('Nota adicionada')
        }

        break
      }
      case Types.ADD_SCHEDULE_INVOICES_REQUEST: {
        draft.additingScheduleInvoice = true

        break
      }
      case Types.ADD_SCHEDULE_INVOICES_FAILURE: {
        draft.additingScheduleInvoice = false

        remote?.dialog.showErrorBox(
          'Error ao adicionar nota fiscal',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Update Invoice
      case Types.UPDATE_SCHEDULE_INVOICES_SUCCESS: {
        const scheduleIndex = draft.schedules.findIndex(
          schedule => schedule.id === action.payload.schedule.id
        )

        if (scheduleIndex !== -1) {
          const invoices = draft.schedules[scheduleIndex].invoices || []

          const invoiceIndex = invoices.findIndex(
            invoice => invoice.id === action.payload.invoice.id
          )

          if (invoiceIndex !== -1) {
            invoices[invoiceIndex] = action.payload.invoice
          }

          draft.schedules[scheduleIndex].invoices = invoices
          draft.updatingScheduleInvoice = false
        }

        break
      }
      case Types.UPDATE_SCHEDULE_INVOICES_REQUEST: {
        draft.updatingScheduleInvoice = true

        break
      }
      case Types.UPDATE_SCHEDULE_INVOICES_FAILURE: {
        draft.updatingScheduleInvoice = false

        remote?.dialog.showErrorBox(
          'Error ao atualizar nota fiscal',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Delete Invoice
      case Types.DELETE_SCHEDULE_INVOICES_SUCCESS: {
        const { deletedInvoice, schedule } = action.payload

        const index = draft.schedules.findIndex(({ id }) => id === schedule.id)

        if (index !== -1) {
          const { invoices } = draft.schedules[index]

          draft.schedules[index].invoices = invoices.filter(
            invoice => invoice.id !== deletedInvoice.id
          )
        }

        draft.deletingScheduleInvoice = false

        toast.success('Nota apagada')

        break
      }
      case Types.DELETE_SCHEDULE_INVOICES_REQUEST: {
        draft.deletingScheduleInvoice = true

        break
      }
      case Types.DELETE_SCHEDULE_INVOICES_FAILURE: {
        draft.deletingScheduleInvoice = false

        remote?.dialog.showErrorBox(
          'Error ao atualizar nota fiscal',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Cancel Invoice
      case Types.CANCEL_SCHEDULE_INVOICES_SUCCESS: {
        const { canceledInvoice, schedule } = action.payload

        const index = draft.schedules.findIndex(({ id }) => id === schedule.id)

        if (index !== -1) {
          const { invoices } = draft.schedules[index]

          draft.schedules[index].invoices = [
            ...invoices.filter(invoice => invoice.id !== canceledInvoice.id),
            canceledInvoice
          ]
        }

        draft.cancelingScheduleInvoice = false

        toast.success('Nota removida')

        break
      }
      case Types.CANCEL_SCHEDULE_INVOICES_REQUEST: {
        draft.cancelingScheduleInvoice = true

        break
      }
      case Types.CANCEL_SCHEDULE_INVOICES_FAILURE: {
        draft.cancelingScheduleInvoice = false

        remote?.dialog.showErrorBox(
          'Error ao removida nota fiscal',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Move Invoice
      case Types.MOVE_SCHEDULE_INVOICES_SUCCESS: {
        const { originSchedule, destinationSchedule } = action.payload

        draft.schedules = draft.schedules.filter(
          schedule =>
            schedule.id !== originSchedule.id &&
            schedule.id !== destinationSchedule.id
        )

        draft.schedules.push(originSchedule)
        draft.schedules.push(destinationSchedule)

        draft.movingScheduleInvoice = false

        toast.success('Nota movida')

        break
      }
      case Types.MOVE_SCHEDULE_INVOICES_REQUEST: {
        draft.movingScheduleInvoice = true

        break
      }
      case Types.MOVE_SCHEDULE_INVOICES_FAILURE: {
        draft.movingScheduleInvoice = false

        remote?.dialog.showErrorBox(
          'Error ao mover nota fiscal',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      // #region Mark Invoice As Received
      case Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_SUCCESS: {
        const { schedule, invoice } = action.payload

        const scheduleIndex = draft.schedules.findIndex(
          current => current.id === schedule.id
        )

        if (scheduleIndex !== -1) {
          const schedule = draft.schedules[scheduleIndex]

          const invoiceIndex = schedule.invoices.findIndex(
            current => current.id === invoice.id
          )

          schedule.invoices[invoiceIndex] = invoice
        }

        draft.markingScheduleInvoiceAsReceived = false
        break
      }
      case Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_REQUEST: {
        draft.markingScheduleInvoiceAsReceived = true
        break
      }
      case Types.MARK_AS_RECEIVED_SCHEDULE_INVOICE_FAILURE: {
        draft.markingScheduleInvoiceAsReceived = false

        remote?.dialog.showErrorBox(
          'Error ao marcar nota fiscal como recebida',
          String(action.payload.message)
        )

        break
      }

      // #endregion

      // #region Mark Invoice As Non Received

      case Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_SUCCESS: {
        const { schedule, invoice } = action.payload

        const scheduleIndex = draft.schedules.findIndex(
          current => current.id === schedule.id
        )

        if (scheduleIndex !== -1) {
          const schedule = draft.schedules[scheduleIndex]

          const invoiceIndex = schedule.invoices.findIndex(
            current => current.id === invoice.id
          )

          schedule.invoices[invoiceIndex] = invoice
        }

        draft.markingScheduleInvoiceAsNonReceived = false
        break
      }
      case Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_REQUEST: {
        draft.markingScheduleInvoiceAsNonReceived = true
        break
      }
      case Types.MARK_AS_NON_RECEIVED_SCHEDULE_INVOICE_FAILURE: {
        draft.markingScheduleInvoiceAsNonReceived = false

        remote?.dialog.showErrorBox(
          'Error ao marcar nota fiscal como não recebida',
          String(action.payload.message)
        )

        break
      }

      // #endregion

      // #region Load
      case Types.LOAD_SCHEDULES_SUCCESS: {
        draft.schedules = action.payload.schedules
        draft.loadingSchedules = false

        toast.success('Agendamentos carregados')

        break
      }
      case Types.LOAD_SCHEDULES_REQUEST: {
        draft.loadingSchedules = true

        break
      }
      case Types.LOAD_SCHEDULES_FAILURE: {
        draft.loadingSchedules = false

        remote?.dialog.showErrorBox(
          'Error ao carregar agendamentos',
          String(action.payload.message)
        )

        break
      }
      // #endregion

      default:
    }
  })
}
