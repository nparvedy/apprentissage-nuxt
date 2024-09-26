<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">
              Profil utilisateur
              <v-spacer></v-spacer>
              <v-btn icon @click="isEditing = !isEditing">
                <v-icon>{{ isEditing ? 'mdi-close' : 'mdi-pencil' }}</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="profile.firstName"
                  label="Prénom"
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="profile.lastName"
                  label="Nom"
                  :disabled="!isEditing"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="profile.email"
                  label="Email"
                  :disabled="!isEditing"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
                <v-btn
                  v-if="isEditing"
                  :disabled="!valid"
                  color="primary"
                  @click="saveProfile"
                >
                  Enregistrer
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
    import { useAuthStore } from '@/stores/auth'
    const authStore = useAuthStore();

    definePageMeta({
        middleware: 'authentification',
    });
  
    // Exemple de profil utilisateur (remplacez par des données récupérées d'une API ou d'un store)
    const profile = ref({
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
    });
  
    const valid = ref(false);
    const isEditing = ref(false);
    
    const rules = {
        required: (value) => !!value || 'Ce champ est requis.',
        email: (value) => {
        const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return pattern.test(value) || 'Email invalide.';
        },
    };
    
    const saveProfile = () => {
        // Implémentez la logique de sauvegarde, par exemple une requête API
        console.log('Profil sauvegardé:', profile.value);
        isEditing.value = false;
    };
</script>
  
<style scoped>
  /* Vous pouvez ajouter des styles personnalisés ici */
</style>
  