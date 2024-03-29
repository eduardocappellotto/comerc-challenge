import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { User } from '@/types/user'
import { generateUsers } from '@/utils/mocks/generateUsers'

const users = ref<User[]>([
  ...generateUsers(10),
  {
    username: 'admin',
    password: 'admin',
    id: 'admin',
    document: 'admin',
    status: 'active'
  }
])

export const useUserStore = defineStore('user', () => {
  const storedUsersJSON = localStorage.getItem('users')
  if (storedUsersJSON) {
    try {
      const parsedUsers = JSON.parse(storedUsersJSON)
      users.value = parsedUsers
    } catch (error) {
      throw new Error('Error parsing stored users data:' + error)
    }
  }

  const saveUsersToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  const getUserById = (id: string): Partial<User> | null => {
    const user = usersList.value.find((user) => user.id == id)
    if (user && user.id) {
      return user
    }
    return null
  }

  const getUserByUsername = (username: string): Partial<User> | null => {
    const user = usersList.value.find((user) => user.username == username)
    if (user && user.username) {
      return user
    }
    return null
  }

  const createUser = (user: Omit<User, 'id'>): User => {
    const newUser: User = {
      ...user,
      id: String(new Date().valueOf())
    }
    users.value.push(newUser)
    saveUsersToLocalStorage()
    return newUser
  }

  const updateUser = (updatedUserData: Partial<User>): Partial<User> | null => {
    const userIndex = users.value.findIndex((user) => user.id === updatedUserData.id)
    if (userIndex !== -1) {
      const updatedUser = { ...users.value[userIndex], ...updatedUserData }
      users.value.splice(userIndex, 1, updatedUser)
      saveUsersToLocalStorage()
      return updatedUser
    }
    return null
  }

  const softDeleteUser = (userId: string): void => {
    const userIndex = users.value.findIndex((user) => user.id === userId)
    if (userIndex !== -1) {
      users.value[userIndex].deleted = true
      saveUsersToLocalStorage()
    }
  }

  const usersList = computed<User[]>(() => {
    return users.value.filter((user) => !user.deleted) || []
  })

  return {
    users,
    usersList,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    softDeleteUser
  }
})
