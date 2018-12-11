<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1
            span(v-if="isHomepage") Homepage
            span(v-else) {{ $route.query.parent }} <span class="sub" v-if="$route.query.title">: {{ $route.query.title }}</span>
        section.page-main__content
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic")
            b-tab-item(label="Media" :disabled="!media")
              media-form(:data="media" v-if="media")
            b-tab-item(label="Button" :disabled="!button")
              button-form(:data="button" v-if="button")
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Page/Main/Basic'
  import mediaForm from '@/components/Forms/Pages/Page/Main/Media'
  import buttonForm from '@/components/Forms/Pages/Page/Main/Button'
  import { lang } from '@/utils'

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
        activeTab: 0
      }
    },

    asyncData ({ store, params }) {
      const token = store.getters['auth/getToken']
      const entryId = params.id
      const promises = []
      let promise
      // const newArray = []

      return api.fetchData(token, entryId, false)
        .then(response => {
          const fields = response.data.fields

          Object.keys(fields).forEach((key) => {
            // console.log(fields[key][lang()]);
            if (fields[key][lang()].sys) {
              const isAsset = key === 'image' || key === 'mobileImage'
              console.log(key, fields[key][lang()].sys.id)
              promise = api.fetchData(token, fields[key][lang()].sys.id, isAsset)
              promises.push(promise)
            }
          })

          return Promise.all(promises)
            .then(res => {
              const [basic, media, button] = res

              console.log('BASIC', basic.data);

              return { 
                basic: basic.data,
                media: media.data,
                button: button.data
              }
            })
        })
    },

    computed: {
      isHomepage () {
        return this.$route.query['isHomepage']
      }
      
    }
  }
</script>

<style lang="scss" scoped>

</style>
