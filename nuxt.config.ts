// nuxt.config.ts
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  
  components: true,

  build: {
    transpile: ['vuetify'],
  },

  modules: [// Pinia module ajouté ici
  '@pinia/nuxt', 'nuxt-simple-sitemap', '@nuxt/image'],

  site: {
    url: 'https://apprendre-en-traduisant.fr',  // Remplace par ton URL
    name: 'Bienvenue sur apprendre en traduisant, la plateforme dédiée à l \'apprentissage des langues, avec un focus particulier sur des langues uniques comme le thaïlandais.',
    exclude: [
      '/admin/**',  // Exclure certaines pages du sitemap
    ],
    routes: [
      '/',
      '/apprendre-alphabet-thai',
    ]
  },

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
      htmlAttrs: {
        lang: 'fr'
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'images/apprendre-en-traduisant.ico' }]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  compatibilityDate: '2024-09-19',
  devtools: { enabled: true },
  
})