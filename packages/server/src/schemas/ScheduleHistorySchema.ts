import { Freight, Vehicle, Size, Charge, Receipt } from '@prisma/client'
import { Schema, Document, model } from 'mongoose'

export interface IScheduleHistorySchema extends Document {
  user: string
  changedSchedule: string
  changes: {
    scheduledAt?: {
      from?: Date
      to: Date
    }
    shippingName?: {
      from?: string
      to: string
    }
    priority?: {
      from?: boolean
      to?: boolean
    }

    freightType?: {
      from?: Freight
      to?: Freight
    }
    vehicleType?: {
      from?: Vehicle
      to?: Vehicle
    }

    lecturer?: {
      from?: string
      to?: string
    }
    driver?: {
      from?: string
      to?: string
    }
    vehicleSize?: {
      from?: Size
      to?: Size
    }
    chargeType?: {
      from?: Charge
      to?: Charge
    }
    palletized?: {
      from?: boolean
      to?: boolean
    }
    assistant?: {
      from?: boolean
      to?: boolean
    }
    pipeSize?: {
      from?: Size
      to?: Size
    }
    receiptPerInvoice?: {
      from?: boolean
      to?: boolean
    }

    dischargeValue?: {
      from?: number
      to?: number
    }
    receiptValue?: {
      from?: number
      to?: number
    }
    paymentMethod?: {
      from?: Receipt
      to?: Receipt
    }

    closedAt?: {
      from?: Date
      to?: Date
    }
    receivedAt?: {
      from?: Date
      to?: Date
    }

    rescheduledAt?: {
      from?: Date
      to?: Date
    }

    canceledAt?: {
      from?: Date
      to?: Date
    }
    motive?: {
      from?: string
      to?: string
    }
  }
}

const schema: Schema = new Schema(
  {
    user: {
      type: String,
      required: true
    },
    changedSchedule: {
      type: String,
      required: true
    },
    changes: {
      scheduledAt: {
        from: {
          type: Date,
          required: false
        },
        to: {
          type: Date,
          required: false
        }
      },
      shippingName: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      priority: {
        from: {
          type: Boolean,
          required: false
        },
        to: {
          type: Boolean,
          required: false
        }
      },

      freightType: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      vehicleType: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },

      lecturer: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      driver: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      vehicleSize: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      chargeType: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      palletized: {
        from: {
          type: Boolean,
          required: false
        },
        to: {
          type: Boolean,
          required: false
        }
      },
      assistant: {
        from: {
          type: Boolean,
          required: false
        },
        to: {
          type: Boolean,
          required: false
        }
      },
      pipeSize: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      receiptPerInvoice: {
        from: {
          type: Boolean,
          required: false
        },
        to: {
          type: Boolean,
          required: false
        }
      },

      dischargeValue: {
        from: {
          type: Number,
          required: false
        },
        to: {
          type: Number,
          required: false
        }
      },
      receiptValue: {
        from: {
          type: Number,
          required: false
        },
        to: {
          type: Number,
          required: false
        }
      },
      paymentMethod: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },

      closedAt: {
        from: {
          type: Date,
          required: false
        },
        to: {
          type: Date,
          required: false
        }
      },
      receivedAt: {
        from: {
          type: Date,
          required: false
        },
        to: {
          type: Date,
          required: false
        }
      },

      rescheduledAt: {
        from: {
          type: Date,
          required: false
        },
        to: {
          type: Date,
          required: false
        }
      },

      canceledAt: {
        from: {
          type: Date,
          required: false
        },
        to: {
          type: Date,
          required: false
        }
      },
      motive: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
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

export const ScheduleHistorySchema = model<IScheduleHistorySchema>(
  'ScheduleHistory',
  schema
)
