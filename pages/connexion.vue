<template>
    <v-container>
        <v-row justify="center" align="center">
            <v-col sm="8" md="6">
                <div v-if="alertStore.alertInscription == false">
                    <alert-information-prototype />
                </div>
            </v-col>
        </v-row>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline">Connexion</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="[rules.required]"
                  label="Mot de passe"
                  type="password"
                  required
                ></v-text-field>
                <v-btn :disabled="!valid" color="primary" @click="login()">Se connecter</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'; // Utilisation du routeur pour la redirection

    const router = useRouter(); // Instanciation du routeur
    const route = useRoute(); // Obtenir la route actuelle
    const authStore = useAuthStore()
    const alertStore = useAlertStore()

    onNuxtReady(() => {
        alertStore.checkAlertInscription()
    })
  
    const email = ref('');
    const password = ref('');
    const valid = ref(false);

    const rules = {
    required: (value) => !!value || 'Ce champ est requis.',
        email: (value) => {
            const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            return pattern.test(value) || 'Email invalide.';
        },
    };

    console.log(authStore.isAuthenticated)

    //si la page de connexion est appelé alors on le ramène à la page d'accueil car il est déjà connecté
    onNuxtReady(() => {
        authStore.checkAuth() // Récupérer l'authentification une fois Nuxt prêt
        if (authStore.isAuthenticated)
        {
            router.push('/'); // Redirection vers la page d'accueil après la connexion
        }
    })

    const login = () => {
        if (email.value && password.value) {
            authStore.login()

            // Rediriger vers la page d'origine, ou vers la page d'accueil si aucune page d'origine n'est définie
            const redirectTo = route.query.redirect || '/';
            router.push(redirectTo);
        }
    };
  
  </script>
  
  <style scoped>
  /* Vous pouvez ajouter des styles personnalisés ici */
  </style>
  