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

    asyncData ({ store, params }) {
      const token = store.getters['auth/getToken']
      const entryId = params.id
      const promises = []
      let promise
      // const newArray = []

      return api.fetchData(token, entryId, false)
        .then(response => {
          promises.push(response)
          const fields = response.data.fields

          Object.keys(fields).forEach((key) => {
            // console.log(fields[key][lang()]);
            if (fields[key][lang()].sys) {
              console.log('KEY', key);
              const isAsset = key === 'image' || key === 'mobileImage' || key === 'backgroundImage'
              console.log(key, fields[key][lang()].sys.id)
              promise = api.fetchData(token, fields[key][lang()].sys.id, isAsset)
              promises.push(promise)
            }
          })

          return Promise.all(promises)
            .then(res => {
              console.log('RES', res);
              const [basic, media, button] = res

              console.log('BASIC', basic);
              console.log('MEDIA', media)
              console.log('BUTTON', button)

              // console.log('BASIC', basic.data);
              // console.log('MEDIA', media.data);
              // console.log('BUTTON', basic);

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
