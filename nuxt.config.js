const pkg = require('./package')
const axios = require('axios')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'My next.js Storyblok',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Aweosme blog about tech stuff built in Nuxt.js'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato:400,700'
      }


    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/tailwind.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['storyblok-nuxt', {
      accessToken: process.env.NODE_ENV == 'production' ?
        'QrlexVGi73PEQLXVSkz9cgtt' : 'GvwFQDEyQdi8nYJ13ov7Kwtt',
      cacheProvider: 'memory'
    }]

  ],

  generate: {
    routes: function () {
      return axios.get('https://api.storyblok.com/v1/cdn/stories?version=published&token=QrlexVGi73PEQLXVSkz9cgtt&starts_with=blog&cv=' + Math.floor(Date.now() / 1e3))
        .then(res => {
          const blogPosts = res.data.stories.map(bp => bp.full_slug)
          return [
            '/',
            '/blog',
            '/about',
            ...blogPosts
          ]
        })
    }
  },

  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    ['@nuxtjs/vuetify', {
      /* module options */
    }]
  ],

  /*
   ** Build configuration
   */
  build: {

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    }
  }

}
