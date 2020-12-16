export interface IUpdatePermissionsDTO {
  title?: string
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
  manageReceiptsOfSchedule?: boolean
  confrontScheduledInvoices?: boolean
  viewValues?: boolean
}
