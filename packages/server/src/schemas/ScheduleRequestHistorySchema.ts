import { Schema, Document, model } from 'mongoose'

export interface IScheduleRequestHistorySchema extends Document {
  user: string
  changedRequest: string
  changes: {
    providerCode?: {
      from?: number
      to?: number
    }
    requestedDate?: {
      from?: Date
      to?: Date
    }
  }
}

const schema: Schema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    changedRequest: {
      type: String,
      required: true
    },
    changes: {
      providerCode: {
        from: {
          type: Number,
          required: false
        },
        to: {
          type: Number,
          required: false
        }
      },
      requestedDate: {
        from: {
          type: Date,
          required: false
        },
        to: {
          type: Date,
          required: false
        }
      }
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)

export const ScheduleRequestHistorySchema = model<
  IScheduleRequestHistorySchema
>('ScheduleRequestHistory', schema)
