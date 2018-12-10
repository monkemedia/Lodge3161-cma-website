<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Location
        section.page-main__content
          basic-form(:data="basic" :entryId="entryIdBasic")
</template>

<script>
  import api from '@/api/contentful'
  import basicForm from '@/components/Forms/Pages/Location/Main/Basic'

  const entryIdBasic = '4HQ5XgrC242EwIggikSiUE'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      basicForm
    },

    data () {
      return {
        entryIdBasic
      }
    },

    asyncData ({ store, params }) {
      const token = store.getters['auth/getToken']
      const promise = Promise.all([
        api.fetchData(token, entryIdBasic, false)
      ])

      return promise
        .then(res => {
          const [basic] = res

          return { 
            basic: basic.data.data
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
