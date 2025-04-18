import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),

  actions: {
    async login({ username, password }) {
      this.user = {
        username,
        name: 'Admin User',
        role: 'admin'
      }
      this.isAuthenticated = true
      
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('isAuthenticated', 'true')
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },

    initAuth() {
      const user = localStorage.getItem('user')
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      
      if (user && isAuthenticated === 'true') {
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    }
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user
  }
}) 