<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Homepage: <span>Main</span>
        section.page-main__content
          b-tabs(v-model="activeTab")
            b-tab-item(label="Basic")
              basic-form(:data="basic" :entryId="entryIdMain")
            b-tab-item(label="Media" disabled)
            b-tab-item(label="Button" disabled)
            b-tab-item(label="Advanced")
              advanced-form(:data="advanced" :entryId="entryIdAdvanced")
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Homepage/Main/Basic'
  import advancedForm from '@/components/Forms/Pages/Homepage/Main/Advanced'

  const entryIdBasic = '7tT62M3wjYWqGMqOyAEoC2'
  const entryIdAdvanced = '2kA2UuLqFmAAcUUMKIMQMO'

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
        entryIdBasic,
        entryIdAdvanced
      }
    },

    asyncData ({ store, params }) {
      const token = store.getters['auth/getToken']
      const promise = Promise.all([
        api.fetchData(token, entryIdBasic, false),
        api.fetchData(token, entryIdAdvanced, false)
      ])

      return promise
        .then(res => {
          const [basic, advanced] = res

          return { 
            basic: basic.data.data,
            advanced: advanced.data.data
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
