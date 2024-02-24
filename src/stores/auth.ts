import type { User } from '@/types/user'
import { ref } from 'vue'

const currentUser = ref<User | null>(null)

export default function useAuthStore() {
  const storedUserJSON = localStorage.getItem('user')
  let storedUser: User | null = null

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON)
      currentUser.value = storedUser
    } catch (error) {
      console.error('Error parsing stored user data:', error)
    }
  }

  const login = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
    currentUser.value = user
  }

  const logout = () => {
    localStorage.removeItem('user')
    currentUser.value = null
  }

  return {
    currentUser,
    login,
    logout
  }
}