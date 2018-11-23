<template lang="pug">
  .columns.is-centered
    .column.is-8
      section.section
        homepage-form(:data="data")
</template>

<script>
  import homepageApi from '@/api/homepage'
  import homepageForm from '@/components/Forms/Pages/Homepage/Main'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      homepageForm
    },

    asyncData ({ store, params }) {
      const token = store.getters['auth/getToken']

      return homepageApi.fetchData(token)
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
