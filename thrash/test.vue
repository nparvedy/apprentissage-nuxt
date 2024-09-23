<template>
  <v-card>
    <v-app>
      <v-layout>
        <v-main>
          <v-container>
            <div v-if="page == 'apprendreAlphabetThai'">
              <ApprendreAlphabetThai :test="test"/>
            </div>
            <div v-else>
              <h1>Main Content</h1>
            </div>
          </v-container>
        </v-main>
      </v-layout>
    </v-app>
    
  </v-card>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useAlphabetStore } from '@/stores/alphabet';
import { useTheme } from 'vuetify'
import { ref } from 'vue'
import ApprendreAlphabetThai from '@/components/ApprendreAlphabetThai';

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const authStore = useAuthStore()

onNuxtReady(() => {
  authStore.checkAuth() // Récupérer l'authentification une fois Nuxt prêt
})

const alphabetStore = useAlphabetStore();

const page = ref('a');

const changePage = (name) => {
  page.value = name;
}

</script>

<style>
.v-toolbar-title:first-child {
  font-family: 'Comic Sans MS', 'Comic Sans', 'cursive';
}
.c-pointer{
  cursor:pointer;
}
</style>