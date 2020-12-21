import { v4 as uuid } from 'uuid'

export interface IPermissions {
  readonly id: string

  title: string

  accessSchedules?: boolean
  createRequest?: boolean
  createSchedule?: boolean
  closeSchedule?: boolean
  manageInvoicesInSchedule?: boolean
  addExtraScheduledInvoices?: boolean
  receiveSchedule?: boolean
  cancelSchedule?: boolean
  rescheduleSchedule?: boolean

  accessAccompaniments?: boolean
  manageAccompaniments?: boolean
  accessRepresentatives?: boolean

  viewValues?: boolean

  createdAt?: Date
  updatedAt?: Date
}

export function createPermissions(
  props: Omit<IPermissions, 'id'>,
  id?: string
): IPermissions {
  return {
    title: props.title,
    accessSchedules: props.accessSchedules,
    createRequest: props.createRequest,
    createSchedule: props.createSchedule,
    closeSchedule: props.closeSchedule,
    manageInvoicesInSchedule: props.manageInvoicesInSchedule,
    addExtraScheduledInvoices: props.addExtraScheduledInvoices,
    receiveSchedule: props.receiveSchedule,
    cancelSchedule: props.cancelSchedule,
    rescheduleSchedule: props.rescheduleSchedule,
    accessAccompaniments: props.accessAccompaniments,
    manageAccompaniments: props.manageAccompaniments,
    accessRepresentatives: props.accessRepresentatives,
    viewValues: props.viewValues,

    id: id || uuid(),

    createdAt: props.createdAt || new Date(),
    updatedAt: props.updatedAt || new Date()
  }
}
