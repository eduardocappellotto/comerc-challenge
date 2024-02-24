export interface User {
  id: number
  username: string
  document: string
  password: string
  status: UserStatus
}

type UserStatus = 'active' | 'deleted'
