<template>
    <div>
        <h1>Bienvenue sur la page d'accueil !</h1>
        <p>Ceci est le contenu de la vue associée à la route /.</p>
        <MyButton>
            Mon button
        </MyButton>
    </div>

    <NuxtLayout>
        <v-app>
        <NuxtPage />
        </v-app>
    </NuxtLayout>
</template>
  
<script>
    import MyButton from '~/components/buttons/MyButton.vue'
    
    export default {
        // Tu peux ajouter du code JavaScript ou des méthodes ici
        components: {
            MyButton
        }
    }
    
</script>

<style>
/* Tu peux ajouter des styles CSS ici */
</style>
  