<template lang="pug">
  .columns.is-centered
    .column.is-8
      section.section
        form-default(:data="data")
</template>

<script>
  import api from '@/api/homepage/hero'
  import formDefault from '@/components/Forms/Pages/Homepage/Hero'

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

      return api.fetchData(token)
        .then(res => {
          return res.data
        })
    }
  }
</script>

<style lang="scss" scoped>
  .section {
    padding-top: 80px;
  }
</style>
