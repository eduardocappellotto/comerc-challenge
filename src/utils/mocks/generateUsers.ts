import type { User } from '@/types/user'
import { faker } from '@faker-js/faker'

const users: User[] = []

export const generateUsers = (count: number): User[] => {
  for (let i = 0; i < count; i++) {
    const user: User = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      document: faker.string.numeric(11),
      status: faker.helpers.arrayElement(['active', 'deleted']),
      password: faker.internet.password(),
      deleted: false
    }

    users.push(user)
  }

  return users
}
