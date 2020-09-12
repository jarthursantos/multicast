import { pick } from 'lodash'
import { v4 as uuid } from 'uuid'

export class Permissions {
  public readonly id: string

  public title: string

  public accessSchedules?: boolean
  public createRequest?: boolean
  public createSchedule?: boolean
  public closeSchedule?: boolean
  public manageInvoicesInSchedule?: boolean
  public addExtraScheduledInvoices?: boolean
  public receiveSchedule?: boolean
  public cancelSchedule?: boolean
  public rescheduleSchedule?: boolean

  public accessAccompaniments?: boolean
  public manageAccompaniments?: boolean
  public accessRepresentatives?: boolean

  public viewValues?: boolean

  public createdAt?: Date
  public updatedAt?: Date

  constructor(props: Omit<Permissions, 'id'>, id?: string) {
    Object.assign(
      this,
      pick(
        props,
        'title',
        'accessSchedules',
        'createRequest',
        'createSchedule',
        'closeSchedule',
        'manageInvoicesInSchedule',
        'addExtraScheduledInvoices',
        'receiveSchedule',
        'cancelSchedule',
        'rescheduleSchedule',
        'accessAccompaniments',
        'manageAccompaniments',
        'accessRepresentatives',
        'viewValues',
        'createdAt',
        'updatedAt',
      )
    )

    this.id = id || uuid()

    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()
  }
}
