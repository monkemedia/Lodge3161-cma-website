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
          button(@click="editProfileModal") Edit
</template>

<script>
  import api from '@/api/contentful'
  import { lang } from '@/utils'
  import editProfileModal from '@/components/Modals/EditProfile'

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
    },

    methods: {
      editProfileModal () {
        const prop = {
          userData: {
            firstName: this.firstName,
            lastName: this.lastName,
            about: this.about,
            image: this.image
          }
        }
        this.$modal.open({
          parent: this,
          component: editProfileModal,
          hasModalCard: true,
          props: prop
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
