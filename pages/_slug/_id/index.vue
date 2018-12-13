<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1
            span(v-if="isHomepage === 'true'") Homepage
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
  import basicForm from '@/components/Forms/Tabs/Basic'
  import mediaForm from '@/components/Forms/Tabs/Media'
  import buttonForm from '@/components/Forms/Tabs/Button'
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

    asyncData ({ store, params, query }) {
      const token = store.getters['auth/getToken']
      const entryId = params.id
      const isParent = query.isParent
      const promises = []
      let promise

      return api.fetchData(token, entryId, false)
        .then(response => {
          const fields = response.data.fields

          promises.push(response)

          Object.keys(fields).forEach((key) => {
            if (fields[key][lang()].sys) {
              const isAsset = key === 'image' || key === 'backgroundImage'
              console.log(key, fields[key][lang()].sys.id)
              const id = fields[key][lang()].sys.id
              promise = api.fetchData(token, id, isAsset)
              promises.push(promise)
            }
          })

          return Promise.all(promises)
            .then(res => {
              if (isParent) {
                return {
                  basic: res[0].data,
                  media: false,
                  button: false
                }
              }

              const [basic, media, button] = res

              return { 
                basic: basic ? basic.data : null,
                media: media ? media.data : null,
                button: button ? button.data : null
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
