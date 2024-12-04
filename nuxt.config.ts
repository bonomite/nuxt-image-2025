// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/image'],
  image: {
    // provider: 'wagtail',
    wagtail: {
      baseURL: 'https://cms.prod.nypr.digital/images/',
    },
    publisher: {
      baseURL: 'https://cms.prod.nypr.digital/images/',
    },
    npr: {
      baseURL: 'https://cms.prod.nypr.digital/images/',
    },
    densities: [1, 2],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },
})
