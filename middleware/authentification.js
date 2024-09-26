// middleware/authentification.js
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router' // Pour la redirection client

export default async function ({ route }) {
  const authStore = useAuthStore();
  const router = useRouter(); // Utilisation du routeur client

  // Vérifie l'authentification
  await authStore.checkAuth();

  if (!authStore.isAuthenticated) {
    const redirectTo = `/connexion?redirect=${route?.fullPath || '/'}`;
    router.push(redirectTo); // Redirection avec vue-router
  }
}
