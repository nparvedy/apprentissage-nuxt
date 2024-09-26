<template>
   <v-app>
      <LoadingComponent v-if="loading" />
        <v-layout>
            <core-drawer />
            <core-app-bar />
            <core-view>
                <slot></slot>
            </core-view>
        </v-layout>
   </v-app> 
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import LoadingComponent from './loading/LoadingComponent.vue';

const loading = ref(true);

onMounted(() => {
  // Simule un délai de chargement, remplace par ton propre code si besoin
  setTimeout(() => {
    loading.value = false;
  }, 400); // Durée de l'animation (ici 2 secondes)
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: transform 0.7s ease, opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  transform: translateX(100%); 
}

.page-enter-from{
  transform: scale(0.8); /* Démarre un peu réduit */
  opacity: 0; /* Complètement transparent */
}

/* Transition pour zoom + fade */
.zoom-fade-enter-active, .zoom-fade-leave-active {
  transition: transform 0.7s ease, opacity 0.7s ease;
}

/* Départ de l'animation (zoom-out et invisible) */
.zoom-fade-enter {
  transform: scale(0.8); /* Démarre un peu réduit */
  opacity: 0; /* Complètement transparent */
}

/* Fin de l'animation (full size et visible) */
.zoom-fade-enter-to {
  transform: scale(1); /* Full size */
  opacity: 1; /* Complètement visible */
}

/* Effet de sortie si besoin */
.zoom-fade-leave-to {
  transform: scale(1.1); /* Légèrement agrandi à la sortie */
  opacity: 0; /* Disparaît en fade */
}
</style>