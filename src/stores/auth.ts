import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const currentUser = ref<Partial<User> | null>(null)

export const useAuthStore = defineStore('auth', () => {
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

  const isAuthenticated = computed<boolean>(() => !!currentUser.value)

  const login = async (user: Partial<User>) => {
    await localStorage.setItem('user', JSON.stringify(user))
    currentUser.value = user
  }

  const logout = () => {
    localStorage.removeItem('user')
    currentUser.value = null
  }

  return {
    currentUser,
    login,
    logout,
    isAuthenticated
  }
})
