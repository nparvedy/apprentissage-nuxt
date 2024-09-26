// stores/auth.js
import { defineStore } from 'pinia'

interface RegisterPayload {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false, // Par défaut, l'utilisateur n'est pas connecté
    token: ""
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
      // const auth = localStorage.getItem('isAuthenticated')
      // this.isAuthenticated = auth === 'true'

      if (import.meta.client) {
        const token = localStorage.getItem('isAuthenticated');
        this.isAuthenticated = token === 'true'
        return !!token;
      }
      return false;
    },
    async register({ email, password}: RegisterPayload) {
      // Remplacez ceci par votre logique d'inscription, par exemple une requête API
      // Voici un exemple avec fetch (assurez-vous que votre API est configurée)
      return;
      const response = await fetch('https://votre-api.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'inscription'); // Gérer les erreurs
      }

      const data = await response.json();
      this.token = data.token; // Assurez-vous de retourner un token ou autre
      this.isAuthenticated = true; // Mettez à jour l'état d'authentification
      localStorage.setItem('authToken', this.token); // Stockez le token
    },
  },
})
