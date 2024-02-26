import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

const validationSchema = toTypedSchema(
  zod.object({
    username: zod.string().min(1, 'Campo obrigatório'),
    password: zod.string().min(1, 'Campo obrigatório'),
    document: zod.string().min(1, 'Campo obrigatório'),
    status: zod.string().min(1, 'Campo obrigatório')
  })
)

export default validationSchema
