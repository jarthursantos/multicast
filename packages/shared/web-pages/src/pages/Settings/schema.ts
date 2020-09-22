import * as Yup from 'yup'

const ipv4 = Yup.string()
  .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
    message: 'IP inválido',
    excludeEmptyString: true
  })
  .test('ip', 'IP inválido', value => {
    return value === undefined || value.trim().length === 0
      ? true
      : value.split('.').find(i => parseInt(i) > 255) === undefined
  })

export const schema = Yup.object().shape({
  network: Yup.object()
    .shape({
      ip: ipv4.required('Obrigátório'),
      port: Yup.number().typeError('Obrigátório').required('Obrigátório')
    })
    .required()
})
