<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 About: <span>Hero</span>
        section.page-main__content
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic")
            b-tab-item(label="Media")
              media-form(:data="media")
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Page/Hero/Basic'
  import mediaForm from '@/components/Forms/Pages/Page/Hero/Media'
  import { lang } from '@/utils'

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
        activeTab: 0
      }
    },

    asyncData ({ store, params }) {
      const token = store.getters['auth/getToken']
      const entryIdBasic = params.slug
      const newArray = []

      return api.fetchData(token, entryIdBasic, false)
        .then(res => {
          newArray.push({ basic: res.data })
          const imageId = res.data.data.fields.image[lang()].sys.id
          return api.fetchData(token, imageId, true)
        })
        .then(res => {
          newArray.push({ media: res.data })
          const [basic, media] = newArray

          return { 
            basic: basic.basic.data,
            media: media.media.data
          }
        })
        .catch(err => {
          return err
        })
    }

    // asyncData ({ store }) {
    //   const token = store.getters['auth/getToken']
    //   const promise = Promise.all([
    //     api.fetchData(token, entryIdBasic, false),
    //     api.fetchData(token, entryIdMedia, true)
    //   ])

    //   return promise
    //     .then(res => {
    //       const [basic, media] = res

    //       return { 
    //         basic: basic.data.data,
    //         media: media.data.data
    //       }
    //     })
    //     .catch(err => {
    //       console.log('ERROR', err);
    //     })
    // }
  }
</script>

<style lang="scss" scoped>
</style>
