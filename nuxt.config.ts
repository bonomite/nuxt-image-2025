// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxt/image'],
  image: {
    // provider: 'wagtail',
    // wagtail: {
    //   baseURL: 'https://cms.prod.nypr.digital/images/',
    // },
    // publisher: {
    //   baseURL: 'https://media.wnyc.org/',
    // },
    // npr: {
    //   baseURL: 'https://cms.prod.nypr.digital/images/',
    // },
    providers: {
      publisher: {
        name: 'publisher', // optional value to overrider provider name
        provider: '~/providers/publisher.ts', // Path to custom provider
        options: {
          // ... provider options
          baseURL: "https://media.wnyc.org/"
        }
      },
      wagtail: {
        name: 'wagtail', // optional value to overrider provider name
        provider: '~/providers/wagtail.ts', // Path to custom provider
        options: {
          // ... provider options
          baseURL: "https://cms.prod.nypr.digital/images/"
        }
      },
      npr: {
        name: 'npr', // optional value to overrider provider name
        provider: '~/providers/npr.ts', // Path to custom provider
        options: {
          // ... provider options
          baseURL: "https://npr.brightspotcdn.com/"
        }
      }
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
