// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    '@pinia/nuxt',
    'nuxt-auth-utils'
  ],
  googleFonts:{
    families:{
      'Hanken+Grotesk': true
    }
  
  },

  runtimeConfig:{
    oauth:{
      Google:{
        clientId: '',
        clientSecret: ''
      }
    }
  }
  
//   ,
//     devServer: {
//   host: '0.0.0.0',
//   port: 3000
// }
})