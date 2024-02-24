export interface User {
  id: number
  name: string
  document: string
  password: string
  status: UserStatus
}

type UserStatus = 'active' | 'deleted'