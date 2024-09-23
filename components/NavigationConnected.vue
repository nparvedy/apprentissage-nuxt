<template>
    <v-navigation-drawer expand-on-hover rail floating v-model="inputValue">
        <v-list>
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/9.jpg"
            subtitle="nicolasparvedy@gmail.com"
            title="Nicolas Parvedy"
        ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-counter" title="Mes scores" value="myscores"></v-list-item>
          <v-list-item prepend-icon="mdi-star-plus" title="Mon abonnement" value="suscribe"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Mon compte" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-arrow-left" title="Se déconnecter" value="disconnect" @click="authStore.logout()"></v-list-item>
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