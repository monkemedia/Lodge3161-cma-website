<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Homepage: <span>Content Block Top</span>
        section.page-main__content
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic")
            b-tab-item(label="Media")
              media-form(:data="media")
            b-tab-item(label="Button")
              button-form(:data="button")
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Homepage/ContentBlockTop/Basic'
  import mediaForm from '@/components/Forms/Pages/Homepage/ContentBlockTop/Media'
  import buttonForm from '@/components/Forms/Pages/Homepage/ContentBlockTop/Button'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      basicForm,
      mediaForm,
      buttonForm
    },

    asyncData ({ store }) {
      const token = store.getters['auth/getToken']
      const entryIdBasic = '1soSRd7k9igWCQCs0m6SoY'
      const entryIdMedia = 'd578aNjuTYScCCSc0aaCY'
      const entryIdButton = '75BP94mOSAqkOYOw8Mqcuy'

      const promise = Promise.all([
        api.fetchData(token, entryIdBasic, false),
        api.fetchData(token, entryIdMedia, true),
        api.fetchData(token, entryIdButton, false)
      ])

      return promise
        .then(res => {
          const [basic, media, button] = res

          return { 
            basic: basic.data.data,
            media: media.data.data,
            button: button.data.data
          }
        })
    },

    data () {
      return {
        activeTab: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
