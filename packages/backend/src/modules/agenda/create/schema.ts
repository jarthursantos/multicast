import * as Yup from 'yup'

export const createAgendaSchema = Yup.object().shape({
  buyer: Yup.number()
    .integer('O código do comprador é inválido')
    .positive('O código do comprador é inválido')
    .required('O código do comprador é obrigatório'),

  agendaFrom: Yup.date()
    .typeError('O inicio do Agendamento é inválido')
    .required('O inicio do Agendamento é obrigatório'),

  agendaTo: Yup.date()
    .typeError('O fim do Agendamento é inválido')
    .required('O fim do Agendamento é obrigatório'),

  providers: Yup.array()
    .of(
      Yup.number()
        .integer()
        .positive()
        .required('Ao menos um fornecedor é necessário')
    )
    .required('Ao menos um fornecedor é necessário')
    .min(1, 'Ao menos um fornecedor é necessário')
})
