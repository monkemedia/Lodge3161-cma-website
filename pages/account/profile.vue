<template lang="pug">
  .columns
    .column.is-7
      .page-main
        header.header
          h1.h1 My Account
        section.page-main__content
          h2.h2 Profile
          figure.image.is-96x96
            img(:src="`${data.media.file[lang].url}?h=96&q=80`" :alt="data.media.title[lang]")
          p {{ data.fields.firstName[lang] }} {{ data.fields.lastName[lang] }}
          p {{ data.fields.about[lang] }}
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
        lang: lang
      }
    },

    async asyncData ({ store, query, error }) {
      const token = store.getters['auth/getToken']
      const user = store.getters['auth/getUser']
      const params = {
        content_type: 'user',
        'fields.userId': user.userId
      }

      let userProfile = await api.fetchEntriesData(token, params)
      const imageId = userProfile.data.fields.image[lang].sys.id
      let image = await api.fetchData(token, imageId, true)

      return {
        data: {
          ...userProfile.data,
          media: {
            ...image.data.fields
          }
        }
      }
    },

    methods: {
      editProfileModal () {
        const props = {
          data: this.data
        }
        this.$modal.open({
          parent: this,
          component: editProfileModal,
          hasModalCard: true,
          props
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
