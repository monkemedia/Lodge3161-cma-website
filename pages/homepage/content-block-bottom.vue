<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Homepage: <span>Content Block Bottom</span>
        section.page-main__content
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic" :entryId="entryIdBasic")
            b-tab-item(label="Media")
              media-form(:data="media" :entryId="entryIdMedia")
            b-tab-item(label="Button")
              button-form(:data="button" :entryId="entryIdButton")
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Homepage/ContentBlockTop/Basic'
  import mediaForm from '@/components/Forms/Pages/Homepage/ContentBlockTop/Media'
  import buttonForm from '@/components/Forms/Pages/Homepage/ContentBlockTop/Button'

  const entryIdBasic = '23zHiEl1jSqy68Qk04YCMu'
  const entryIdMedia = '6IFBR4Iz96cOE4w888A0AG'
  const entryIdButton = '2qhPXlN3msa8sMOa0A4aIW'

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

    data () {
      return {
        activeTab: 0,
        entryIdBasic,
        entryIdMedia,
        entryIdButton
      }
    },

    asyncData ({ store }) {
      const token = store.getters['auth/getToken']
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
    }
  }
</script>

<style lang="scss" scoped>
</style>
