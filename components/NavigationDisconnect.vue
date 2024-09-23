<template>
    <v-navigation-drawer expand-on-hover rail>
        <v-list>
        <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/lego/5.jpg"
            title="Anonyme"
        ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-account" title="Se connecter" value="shared" @click="authStore.login()"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onNuxtReady(() => {
  authStore.checkAuth() // Récupérer l'authentification une fois Nuxt prêt
})
</script>