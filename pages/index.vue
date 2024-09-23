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
        
        <v-app-bar class="px-3 custom-font">
          <v-toolbar-title @click="changePage('')" class="c-pointer">
            Apprendre en traduisant
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn prepend-icon="mdi-abugida-thai" @click="changePage('apprendreAlphabetThai')">
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