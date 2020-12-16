import * as Yup from 'yup'

export const createPermissionsSchema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),

  accessSchedules: Yup.boolean().required(),
  createRequest: Yup.boolean().required(),
  createSchedule: Yup.boolean().required(),
  closeSchedule: Yup.boolean().required(),
  manageInvoicesInSchedule: Yup.boolean().required(),
  addExtraScheduledInvoices: Yup.boolean().required(),
  receiveSchedule: Yup.boolean().required(),
  cancelSchedule: Yup.boolean().required(),
  rescheduleSchedule: Yup.boolean().required(),
  accessAccompaniments: Yup.boolean().required(),
  manageAccompaniments: Yup.boolean().required(),
  accessRepresentatives: Yup.boolean().required(),
  viewValues: Yup.boolean().required()
})
