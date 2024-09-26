// stores/alert.js
import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alertDeveloppement: false, // Par défaut, l'utilisateur n'a pas l'alert
    alertInscription: false,
  }),
  actions: {
    valideAlertDeveloppement() {
      this.alertDeveloppement = true
      localStorage.setItem('ifAlertDeveloppementSee', 'true') // Sauvegarde dans le localStorage
    },
    checkAlertDeveloppement() {
        const alertDeveloppement = localStorage.getItem('ifAlertDeveloppementSee')
        this.alertDeveloppement = alertDeveloppement === 'true'
    },
    checkAlertInscription() {
      const alertInscription = localStorage.getItem('ifAlertInscriptionSee')
      this.alertInscription = alertInscription === 'true'
    }
  },
})
