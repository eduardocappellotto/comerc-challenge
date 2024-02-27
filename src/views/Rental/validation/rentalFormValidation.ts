import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

const phoneRegex = new RegExp(/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/)

const validationSchema = toTypedSchema(
  zod
    .object({
      client: zod.object({}).refine((client) => Object.keys(client).length > 0, {
        message: 'Client object cannot be empty'
      }),
      startDate: zod.coerce.date().refine((data) => data > new Date(), {
        message: 'Data inicial precisa ser agora ou no futuro!'
      }),
      endDate: zod.coerce.date(),
      locatedBy: zod.object({}).refine((client) => Object.keys(client).length > 0, {
        message: 'Locatedby object cannot be empty'
      }),
      movies: zod
        .array(
          zod.object({
            imdbID: zod.string(),
            Title: zod.string(),
            Year: zod.string(),
            Poster: zod.string()
          })
        )
        .min(1),
      status: zod.union([zod.literal('rented'), zod.literal('returned')])
    })
    .refine((data) => data.endDate > data.startDate, {
      message: 'Data final não pode ser antes da data inicial!',
      path: ['endDate']
    })
)

export default validationSchema
