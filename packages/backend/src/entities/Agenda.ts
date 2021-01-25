import { Schema, Document, model } from 'mongoose'

export interface IAgendaSchema extends Document {
  buyer: number
  date: {
    from: Date
    to: Date
  }
  providers: number[]
  createdBy: string
}

const schema = new Schema(
  {
    buyer: {
      type: Number,
      required: true
    },
    date: {
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      }
    },
    providers: {
      type: [Number],
      required: true
    },
    createdBy: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)

export const AgendaSchema = model<IAgendaSchema>('AgendaSchema', schema)
