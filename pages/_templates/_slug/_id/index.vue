<template lang="pug">
  .columns
    .column.is-10
      .page-main
        header.header
          h1.h1 Pages
        section.page-main__content
          h2.h2 {{ $route.params.query }}
            | {{ removeCamelCase($route.params.slug) }} <span class="sub" v-if="!$route.query.isParent && $route.query.entries">: {{ removeCamelCase($route.query.entries) }} </span>
          span.id-subtitle ID: {{ $route.params.id }}
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic")
            b-tab-item(label="Media" :disabled="!media")
              media-form(:data="media" v-if="media")
            b-tab-item(label="Button" :disabled="!button")
              button-form(:data="button" v-if="button")
</template>

<script>
  import _ from 'lodash'
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
        activeTab: 0,
        basic: null,
        media: null,
        button: null
      }
    },

    async asyncData ({ store, params, query, error }) {
      const token = store.getters['auth/getToken']
      const entryId = params.id
      const isParent = query.isParent
      const promises = []
      let promise

      if (entryId === undefined) { 
        return error({ statusCode: 404, message: 'Sadly this page cannot be found.' })
      }

      try {
        let fetchData = await api.fetchData(token, entryId, false)
        const fields = fetchData.data.fields
        let promiseAll

        Object.keys(fields).forEach((key) => {
          if (fields[key][lang()].sys) {
            const isAsset = key === 'image' || key === 'backgroundImage'
            const id = fields[key][lang()].sys.id
            promise = api.fetchData(token, id, isAsset)
            promises.push(promise)
          }
        })

        promiseAll = await Promise.all(promises)
        
        if (isParent) {
          return {
            basic: promiseAll[0].data,
            media: false,
            button: false
          }
        }

        const [basic, media, button] = promiseAll

        return { 
          basic: basic ? basic.data : false,
          media: media ? media.data : false,
          button: button ? button.data : false
        }
      } catch(err) {
          error({ statusCode: 500, message: 'Something went wrong.' })
      }
    },

    computed: {
      isHomepage () {
        return this.$route.query['isHomepage']
      }
    },

    methods: {
      removeCamelCase (string) {
        return _.startCase(string);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';
  @import '../../../../node_modules/sass-rem/rem';

  .h1 {
    margin-bottom: 15px;
  }

  .id-subtitle {
    font-size: rem(11px);
    color: $grey-lighter;
    font-weight: bold;
  }

  .b-tabs {
    margin-top: 30px;
  }

</style>
