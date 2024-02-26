export interface User {
  id: string
  username: string
  document: string
  password: string
  status: UserStatus
}

export interface UserLogin {
  username: string
  password: string
}

export type UserStatus = 'active' | 'deleted'
