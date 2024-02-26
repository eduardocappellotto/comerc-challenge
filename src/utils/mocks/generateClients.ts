import { faker } from '@faker-js/faker'
import type { Client } from '@/types/client'

const clients: Client[] = []

export const generateClients = (count: number): Client[] => {
  for (let i = 0; i < count; i++) {
    const user: Client = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      cpf: faker.string.numeric(11),
      contacts: {
        email: faker.internet.email(),
        phone: faker.phone.number()
      },
      address: {
        zipcode: faker.location.zipCode(),
        street: faker.location.street(),
        neighborhood: faker.location.county(),
        city: faker.location.city(),
        state: faker.location.state()
      }
    }

    clients.push(user)
  }

  return clients
}
