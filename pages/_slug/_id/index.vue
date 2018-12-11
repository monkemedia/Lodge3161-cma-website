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
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Page/Main/Basic'
  import mediaForm from '@/components/Forms/Pages/Page/Main/Media'
  // import advancedForm from '@/components/Forms/Pages/Page/Main/Advanced'
  // import { lang } from '@/utils'

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
      const entryId = params.id
      const newArray = []

      return api.fetchData(token, entryId, false)
        .then(res => {
          newArray.push(res.data)

          if (res.data.fields.image) {
            return api.fetchData(token, res.data.fields.image['en-GB'].sys.id, true)
          }

        })
        .then(res => {
          // console.log('res', res);
          console.log('monkey', res);
          if (res) {
            newArray.push(res.data)
            const [basic, media] = newArray

            return { 
              basic,
              media,
            }
          } else {

            const [basic] = newArray
            console.log('no asset');

            return { 
              basic,
              media: false
            }
          }
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
