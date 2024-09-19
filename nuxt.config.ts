// nuxt.config.ts
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  components: true,

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@pinia/nuxt',  // Pinia module ajouté ici
  ],

  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2024-09-19',
})