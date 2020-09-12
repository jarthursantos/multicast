import { InvoiceOrigin } from '@prisma/client'
import { Schema, Document, model } from 'mongoose'

export interface IInvoiceHistorySchema extends Document {
  user: string
  changedInvoice: string
  changes: {
    origin?: {
      from?: InvoiceOrigin
      to: InvoiceOrigin
    }

    providerCode?: {
      from?: number
      to: number
    }
    number?: {
      from?: number
      to: number
    }
    value?: {
      from?: number
      to?: number
    }

    emittedAt?: {
      from?: Date
      to?: Date
    }

    key?: {
      from?: string
      to?: string
    }
    weight?: {
      from?: number
      to?: number
    }
    volume?: {
      from?: number
      to?: number
    }

    cteNumber?: {
      from?: number
      to?: number
    }
    cteKey?: {
      from?: string
      to?: string
    }

    dischargeValue?: {
      from?: number
      to?: number
    }
    receiptValue?: {
      from?: number
      to?: number
    }

    scheduleId?: {
      from?: string
      to?: string
    }
    invoiceFileId?: {
      from?: string
      to?: string
    }
    cteFileId?: {
      from?: string
      to?: string
    }

    canceledAt?: {
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
    changedInvoice: {
      type: String,
      required: true
    },
    changes: {
      origin: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },

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
      number: {
        from: {
          type: Number,
          required: false
        },
        to: {
          type: Number,
          required: false
        }
      },
      value: {
        from: {
          type: Number,
          required: false
        },
        to: {
          type: Number,
          required: false
        }
      },

      emittedAt: {
        from: {
          type: Date,
          required: false
        },
        to: {
          type: Date,
          required: false
        }
      },

      key: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      weight: {
        from: {
          type: Number,
          required: false
        },
        to: {
          type: Number,
          required: false
        }
      },
      volume: {
        from: {
          type: Number,
          required: false
        },
        to: {
          type: Number,
          required: false
        }
      },

      cteNumber: {
        from: {
          type: Number,
          required: false
        },
        to: {
          type: Number,
          required: false
        }
      },
      cteKey: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
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

      scheduleId: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      invoiceFileId: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
          required: false
        }
      },
      cteFileId: {
        from: {
          type: String,
          required: false
        },
        to: {
          type: String,
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

export const InvoiceHistorySchema = model<IInvoiceHistorySchema>(
  'InvoiceHistory',
  schema
)
