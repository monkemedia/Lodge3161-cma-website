<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Homepage: <span>Feature Item 1</span>
        section.page-main__content
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic" :entryId="entryIdBasic")
            b-tab-item(label="Media")
              media-form(:data="media" :entryId="entryIdMedia")
            b-tab-item(label="Button" disabled)
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Homepage/FeatureItems/Basic'
  import mediaForm from '@/components/Forms/Pages/Homepage/FeatureItems/Media'

  const entryIdBasic = '2pV2zP4rZu04YsGyKUao4A'
  const entryIdMedia = '6qFiHSYGPYMQSASCg0wWIY'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      basicForm,
      mediaForm
    },

    data () {
      return {
        activeTab: 0,
        entryIdBasic,
        entryIdMedia
      }
    },

    asyncData ({ store }) {
      const token = store.getters['auth/getToken']
      const promise = Promise.all([
        api.fetchData(token, entryIdBasic, false),
        api.fetchData(token, entryIdMedia, true)
      ])

      return promise
        .then(res => {
          const [basic, media] = res

          return { 
            basic: basic.data.data,
            media: media.data.data
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
</style>
