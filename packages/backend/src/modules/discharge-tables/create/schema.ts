import * as Yup from 'yup'

export const createDischargeTableSchema = Yup.object().shape({
  smallPipe: Yup.number().required(),
  mediumPipe: Yup.number().required(),
  largePipe: Yup.number().required(),

  beatPalletizedWithAssistant: Yup.number().required(),
  beatPalletizedWithoutAssistant: Yup.number().required(),
  beatNonPalletizedWithAssistant: Yup.number().required(),
  beatNonPalletizedWithoutAssistant: Yup.number().required(),

  volumePalletizedWithAssistant: Yup.number().required(),
  volumePalletizedWithoutAssistant: Yup.number().required(),
  volumeNonPalletizedWithAssistant: Yup.number().required(),
  volumeNonPalletizedWithoutAssistant: Yup.number().required()
})
