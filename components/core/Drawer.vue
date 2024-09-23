<template>
    <!-- Affichage conditionnel basé sur l'état de connexion -->
    <div v-if="authStore.isAuthenticated" :key="'connected'" >
        <NavigationConnected />
    </div>
    <div v-else :key="'disconnected'">
        <NavigationDisconnect />
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onNuxtReady(() => {
  authStore.checkAuth() // Récupérer l'authentification une fois Nuxt prêt
})
</script>