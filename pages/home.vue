<template>
  <v-card>
    <v-app>
      <v-layout>
        <!-- Affichage conditionnel basé sur l'état de connexion -->
        <div v-if="authStore.isAuthenticated">
          <NavigationConnected />
        </div>
        <div v-else>
          <NavigationDisconnect />
        </div>
        
        <v-app-bar class="px-3 custom-font" title="Apprendre en traduisant">

          <v-spacer></v-spacer>

          <v-btn prepend-icon="mdi-abugida-thai" >
            Apprendre l'alphabet
          </v-btn>

          <v-btn
            :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
            text="Toggle Theme"
            slim
            @click="toggleTheme"
          ></v-btn>
        </v-app-bar>

        <v-main>
          <v-container>
            <h1>Main Content</h1>
          </v-container>
        </v-main>
      </v-layout>
    </v-app>
    
  </v-card>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const authStore = useAuthStore()
</script>

<style>
.v-toolbar-title:first-child {
  font-family: 'Comic Sans MS', 'Comic Sans', 'cursive';
}
</style>