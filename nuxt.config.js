import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'Project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/lynnhotel.png' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/firebaseConfig.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      dark: false,
      themes: {
        dark: {
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          sky: colors.cyan.lighten4,
          foot: '#dcd2c9',
          bl: '#006064',
          primary: colors.blue.darken2,
          lightblue: '#E0F7FA',
          gray: '#BDBDBD',
          manu: '#447695',
          banner: '#04082e',
          buttonS: '#DCB13C',
          mainS: '#EFEFEE',
          bar: '#bfe6ef',
        },
        light: {
          sky: colors.cyan.lighten4,
          foot: '#dcd2c9',
          bl: '#efefee',
          primary: colors.blue.darken2,
          lightblue: '#E0F7FA',
          gray: '#BDBDBD',
          manu: '#447695',
          banner: '#04082e',
          buttonS: '#DCB13C',
          mainS: '#EFEFEE',
          bar: '#bfe6ef',
          top: '#2C3259',
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
