import { faker } from '@faker-js/faker'

interface User {
  id: string
  username: string
  document: string
  status: 'active' | 'deleted'
  password: string
}

const users: User[] = []

export const generateUsers = (count: number): User[] => {
  for (let i = 0; i < count; i++) {
    const user: User = {
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      document: faker.string.numeric(11),
      status: faker.helpers.arrayElement(['active', 'deleted']),
      password: faker.internet.password()
    }

    users.push(user)
  }

  return users
}
