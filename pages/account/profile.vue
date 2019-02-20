<template lang="pug">
  .columns
    .column.is-7
      .page-main
        header.header
          h1.h1 My Account
        section.page-main__content
          h2.h2 Profile
          figure.image.is-96x96
            img(:src="image.file[lang].url + '?h=96&q=80'" :alt="image.title[lang]")
          p {{ firstName }} {{ lastName }}
          p {{ about }}
</template>

<script>
  import api from '@/api/contentful'
  import { lang } from '@/utils'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    data () {
      return {
        lang: lang()
      }
    },

    async asyncData ({ store, params, query, error }) {
      const token = store.getters['auth/getToken']
      const user = store.getters['auth/getUser']

      let userProfile = await api.userProfile.fetchData(token, user.userId)
      let image = await api.fetchData(token, userProfile.data.image.id, true)

      return {
        ...userProfile.data,
        firstName: user.firstName,
        lastName: user.lastName,
        image: {
          ...image.data.fields
        }
        
      }
 
    }
  }
</script>

<style lang="scss" scoped>
</style>
