import * as Yup from 'yup'

export const storeSchema = Yup.object().shape({
  number: Yup.number()
    .integer('O valor informado é inválido')
    .typeError('O Número é obrigatório')
    .required('O Número é obrigatório'),

  // providers: Yup.array().of(
  //   Yup.object().shape({
  //     code: Yup.number().integer().required('É necessário um fornecedor')
  //   })
  // ),

  emittedAt: Yup.date().typeError('A Data da emissão não é válida').nullable(),

  key: Yup.string()
    .transform((value: string) => (value.length ? value : null))
    .length(44, 'A chave precisa ter 44 digitos')
    .min(44, 'A chave precisa ter 44 digitos')
    .nullable(),

  weight: Yup.number().transform(value => value || undefined),

  volume: Yup.number().transform(value => value || undefined),

  value: Yup.number().transform(value => value || undefined),

  cteNumber: Yup.number()
    .integer('O valor informado é inválido')
    .transform(value => value || undefined),

  cteKey: Yup.string()
    .transform((value: string) => (value.length ? value : null))
    .length(44, 'A chave precisa ter 44 digitos')
    .min(44, 'A chave precisa ter 44 digitos')
    .nullable()
})

export const storeConflictedSchema = Yup.object().shape({
  number: Yup.number()
    .integer('O valor informado é inválido')
    .typeError('O Número é obrigatório')
    .required('O Número é obrigatório'),

  emittedAt: Yup.date().typeError('A Data da emissão não é válida').required(),

  key: Yup.string()
    .transform((value: string) => (value.length ? value : ''))
    .length(44, 'A chave precisa ter 44 digitos')
    .min(44, 'A chave precisa ter 44 digitos')
    .required('A chave é obrigatória'),

  weight: Yup.number()
    .transform(value => value || undefined)
    .required('Peso obrigatório'),

  volume: Yup.number()
    .transform(value => value || undefined)
    .required('Volume obrigatório'),

  value: Yup.number()
    .transform(value => value || undefined)
    .required('Valor obrigatório'),

  cteNumber: Yup.number()
    .integer('O valor informado é inválido')
    .transform(value => value || undefined),

  cteKey: Yup.string()
    .transform((value: string) => (value.length ? value : null))
    .length(44, 'A chave precisa ter 44 digitos')
    .min(44, 'A chave precisa ter 44 digitos')
    .nullable()
})
