import { Role } from '@prisma/client'
import { Schema, Document, model } from 'mongoose'

export interface IUserHistorySchema extends Document {
  user: string
  changedUser: string
  changes: {
    email?: {
      from?: string
      to: string
    }
    name?: {
      from?: string
      to: string
    }
    role?: {
      from?: Role
      to: Role
    }
    permissionsId?: {
      from?: string
      to?: string
    }
    disabledAt?: {
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
    changedUser: {
      type: String,
      required: true
    },
    changes: {
      email: {
        from: {
          type: String,
          required: false
        },
        to: String
      },
      name: {
        from: {
          type: String,
          required: false
        },
        to: String
      },
      role: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String
        }
      },
      permissionsId: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      disabledAt: {
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

export const UserHistorySchema = model<IUserHistorySchema>(
  'UserHistory',
  schema
)
