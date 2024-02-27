import type { User, UserLogin } from '@/types/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'

const currentUser = ref<Partial<User>>()

export const useAuthStore = defineStore('auth', () => {
  const storedUserJSON = localStorage.getItem('user')
  let storedUser: User | null = null

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON)
      currentUser.value = storedUser!
    } catch (error) {
      console.error('Error parsing stored user data:', error)
    }
  }

  const isAuthenticated = computed<boolean>(() => !!currentUser.value?.username)

  const login = async (user: UserLogin) => {
    const userFound = await useUserStore().getUserByUsername(user.username)

    if (userFound) {
      if (
        userFound.username === user.username &&
        userFound.password === user.password &&
        userFound.status !== 'deleted' &&
        !userFound.deleted
      ) {
        await localStorage.setItem('user', JSON.stringify(user))
        currentUser.value = user

        return
      }
    }
    throw new Error('Usuário/Senha errados e/ou Usuário Inativo!')
  }

  const logout = () => {
    localStorage.removeItem('user')
    currentUser.value = {}
  }

  return {
    currentUser,
    login,
    logout,
    isAuthenticated
  }
})
