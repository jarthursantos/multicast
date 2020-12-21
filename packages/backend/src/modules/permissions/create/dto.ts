export interface ICreatePermissionsDTO {
  title: string
  accessRequests?: boolean
  manageRequests?: boolean
  accessRepresentatives?: boolean
  accessSchedules?: boolean
  createRequest?: boolean
  createSchedule?: boolean
  closeSchedule?: boolean
  manageInvoicesInSchedule?: boolean
  manageDriverOfSchedule?: boolean
  manageVehicleOfSchedule?: boolean
  confrontScheduledInvoices?: boolean
  viewValues?: boolean
}
