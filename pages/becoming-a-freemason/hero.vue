<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 About: <span>Hero</span>
        section.page-main__content
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic" :entryId="entryIdBasic")
            b-tab-item(label="Media")
              media-form(:data="media" :entryId="entryIdMedia")
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Page/Hero/Basic'
  import mediaForm from '@/components/Forms/Pages/Page/Hero/Media'
  const entryIdBasic = '2tNMVUfNWEYkIa6cE8gyks'
  const entryIdMedia = '6wXPKmUbCwUSCa6cQCE2Ak'

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
        .catch(err => {
          console.log('ERROR', err);
        })
    }
  }
</script>

<style lang="scss" scoped>
</style>
