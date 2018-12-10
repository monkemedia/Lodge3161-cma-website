<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 About: <span>Main</span>
        section.page-main__content
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic")
            b-tab-item(label="Advanced")
              advanced-form(:data="advanced")
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Page/Main/Basic'
  import advancedForm from '@/components/Forms/Pages/Page/Main/Advanced'
  import { lang } from '@/utils'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      basicForm,
      advancedForm
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
          const pageMetaId = res.data.data.fields.pageMeta[lang()].sys.id
          return api.fetchData(token, pageMetaId, false)
        })
        .then(res => {
          newArray.push({ advanced: res.data })
          const [basic, advanced] = newArray

          return { 
            basic: basic.basic.data,
            advanced: advanced.advanced.data
          }
        })
        .catch(err => {
          return err
        })
    }
  }
</script>

<style lang="scss" scoped>

</style>
