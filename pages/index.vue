<template>
  <v-container>
    <h1>Nos applications pour apprendre des langues</h1>
    
    <v-sheet color="info" rounded :elevation="5" class="mx-auto mt-3">
      <p class="pa-5"><v-icon class="mx-1" size="45px" color="yellow" >mdi-pac-man</v-icon>Bienvenue sur <strong>apprendre en traduisant</strong>, la plateforme dédiée à l'apprentissage des langues, avec un focus particulier sur des langues uniques comme le thaïlandais.<br><br> Nous développons des applications intuitives et interactives pour vous aider à maîtriser de nouvelles langues à votre rythme. Grâce à des outils immersifs, des exercices pratiques et un apprentissage progressif, nos solutions sont conçues pour rendre l'apprentissage ludique et efficace, que vous soyez débutant ou avancé. Découvrez une nouvelle façon d'apprendre et de vous immerger dans la culture linguistique !</p>
    </v-sheet>

    <v-expansion-panels class="mt-10" v-model="activePanel" eager>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <h2>Apprendre le thaïlandais</h2>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row class="justify-center">
            <card-application-alphabet />
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    
  </v-container>
  
</template>

<script setup>
  useHead({
    title: 'Apprendre en traduisant - accueil',
    meta: [
      { name: 'Apprendre en traduisant', content: 'Apprendre des langues grâce à nos applications, comme le thaïlandais' }
    ]
  })

  import { ref } from 'vue'

  // Variable pour gérer l'état du panneau (commence à 0 pour ouvrir le premier panneau)
  const activePanel = ref(0)
</script>

<style>
.v-toolbar-title:first-child {
  font-family: 'Comic Sans MS', 'Comic Sans', 'cursive';
}
.c-pointer{
  cursor:pointer;
}

.t-center
{
  text-align:center;
}

.size-1{
  font-size:1rem !important;
}
/* Animation de transition personnalisée */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active dans certains cas */ {
  opacity: 0;
}
</style>