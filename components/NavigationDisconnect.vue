<template>
    <v-navigation-drawer expand-on-hover rail v-model="inputValue">
        <v-list>
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/lego/5.jpg"
            title="Anonyme" role="listitem" aria-label="Profil d'utilisateur anonyme"
        ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-account" title="Se connecter" value="connexion" to="connexion"></v-list-item>
          <v-list-item prepend-icon="mdi-account-plus" title="S'inscrire" value="register" to="register"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const authStore = useAuthStore()
const appStore = useAppStore()

onNuxtReady(() => {
  authStore.checkAuth() // Récupérer l'authentification une fois Nuxt prêt
})

// Pour gérer l'état du drawer
const inputValue = computed({
  get: () => appStore.drawer,
  set: (val) => {
    appStore.setDrawer(val)
  },
})
</script>