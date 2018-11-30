<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Homepage: <span>Main</span>
        section.page-main__content
          form-default(:data="data")
</template>

<script>
  import api from '@/api/contentful'
  import formDefault from '@/components/Forms/Pages/Homepage/Main.vue'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      formDefault
    },

    asyncData ({ store, params }) {
      const token = store.getters['auth/getToken']
      const url = '/homepage/main'

      return api.fetchData(token, url)
        .then(res => {
          return res.data
        })
    }
  }
</script>

<style lang="scss" scoped>

</style>
