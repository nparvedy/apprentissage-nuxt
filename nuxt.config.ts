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

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          
        }
      ],
      htmlAttrs: {
        lang: 'fr'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  compatibilityDate: '2024-09-19',
  devtools: { enabled: true },
  
})