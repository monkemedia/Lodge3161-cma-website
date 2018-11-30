<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Homepage: <span>Hero</span>
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
  import basicForm from '@/components/Forms/Pages/Homepage/Hero/Basic'
  import mediaForm from '@/components/Forms/Pages/Homepage/Hero/Media'
  import buttonForm from '@/components/Forms/Pages/Homepage/Hero/Button'

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
      const urlBasic = 'homepage/hero/basic'
      const urlMedia = 'homepage/hero/media'
      const urlButton = 'homepage/hero/button'

      const promise = Promise.all([
        api.fetchData(token, urlBasic),
        api.fetchData(token, urlMedia),
        api.fetchData(token, urlButton)
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
