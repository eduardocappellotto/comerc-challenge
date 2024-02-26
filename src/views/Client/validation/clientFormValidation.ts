import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

const phoneRegex = new RegExp(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/)

const validationSchema = toTypedSchema(
  zod.object({
    name: zod.string().min(1, 'O nome é obrigatório'),
    surname: zod.string().min(1, 'O sobrenome é obrigatório'),
    cpf: zod.string().min(1, 'O CPF é obrigatório').min(11, 'CPF Inválido'),
    zipcode: zod.string().min(1, 'O CEP é obrigatório').min(8, 'CEP Inválido'),
    city: zod.string().min(1, 'A cidade é obrigatória'),
    state: zod.string().min(1, 'O estado é obrigatório'),
    street: zod.string().min(1, 'O logradouro é obrigatório'),
    neighborhood: zod.string().min(1, 'O bairro é obrigatório'),
    email: zod.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
    phone: zod.string().min(1, 'O telefone é obrigatório').regex(phoneRegex, 'Número Inválido!')
  })
)

export default validationSchema
