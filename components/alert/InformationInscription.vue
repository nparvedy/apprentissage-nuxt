<template>
    <v-alert
      density="compact"
      text="Les pages d'inscription et de connexion ne sont pas encore opérationnelles. Bien que ces fonctionnalités soient visibles sur l'application, aucune donnée ne sera enregistrée à ce stade. Nous travaillons activement pour les rendre disponibles et fonctionnelles dans les plus brefs délais. Merci de votre patience et de votre compréhension !"
      title="Page d'inscription et connexion en développement"
      type="warning"
      closable
      @click:close="alertStore.valideAlertDeveloppement()"
    ></v-alert>
  </template>

<script setup>
    const alertStore = useAlertStore()
</script>