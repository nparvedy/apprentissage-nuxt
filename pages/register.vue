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
                    <v-card-title class="headline">Inscription</v-card-title>
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="email"
                                    label="Adresse Email"
                                    :rules="[rules.required, rules.email]"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    label="Mot de passe"
                                    type="password"
                                    :rules="[rules.required]"
                                    required
                                ></v-text-field>
                            <v-btn :disabled="!valid" color="primary" @click="register">
                                S'inscrire
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/stores/auth';

    const email = ref('');
    const password = ref('');
    const valid = ref(false);
    const router = useRouter();
    const authStore = useAuthStore();
    const alertStore = useAlertStore()

    onNuxtReady(() => {
        alertStore.checkAlertInscription()
    })
  
    const rules = {
        required: (value) => !!value || 'Ce champ est requis.',
        email: (value) => {
            const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            return pattern.test(value) || 'Email invalide.';
        },
    };
  
    const register = async () => {
    // Implémentez ici la logique pour inscrire l'utilisateur
    try {
        // Remplacez ceci par votre logique d'inscription, par exemple une requête API
        await authStore.register({ email: email.value, password: password.value });
        // Redirige vers la page de connexion ou une autre page après l'inscription
        await router.push('/connexion');
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
    }
    };
  </script>
  
  <style scoped>
  /* Ajoutez des styles personnalisés ici */
  </style>
  