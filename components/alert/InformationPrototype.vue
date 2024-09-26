<template>
    <v-alert
      density="compact"
      text="Notre application pour l'apprentissage des langues est actuellement en cours de développement. Vous pourriez rencontrer quelques bugs ou anomalies pendant votre utilisation. N'hésitez surtout pas à nous faire part de vos retours et suggestions afin que nous puissions l'améliorer et offrir une meilleure expérience à tous les utilisateurs. Merci de votre compréhension et de votre soutien !"
      title="Application en développement"
      type="warning"
      closable
      @click:close="alertStore.valideAlertDeveloppement()"
    ></v-alert>
  </template>

<script setup>
    const alertStore = useAlertStore()
</script>