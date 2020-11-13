import * as Yup from 'yup'

export const findStockNotificationsSchema = Yup.object().shape({
  periodFrom: Yup.date().required('O inicio do período é obrigatório'),
  periodTo: Yup.date().required('O fim do período é obrigatório'),

  buyers: Yup.array().of(Yup.number().integer()).nullable(),
  providers: Yup.array().of(Yup.number().integer()).nullable()
})
