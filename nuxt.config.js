export default {
  target: 'static',

  head: {
    title: 'tj-counter',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap', defer: true, async: true, preconnect: true }
    ]
  },
  css: ['@/assets/scss/main.scss'],
  styleResources: {
    scss: [
      '@/assets/scss/_variables.scss',
    ]
  },
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],
  components: true
}
