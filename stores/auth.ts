// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false, // Par défaut, l'utilisateur n'est pas connecté
  }),
  actions: {
    login() {
      this.isAuthenticated = true
      localStorage.setItem('isAuthenticated', 'true') // Sauvegarde dans le localStorage
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('isAuthenticated') // Retire l'authentification
    },
    checkAuth() {
      const auth = localStorage.getItem('isAuthenticated')
      this.isAuthenticated = auth === 'true'
    }
  },
})
