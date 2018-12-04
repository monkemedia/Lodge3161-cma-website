<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Homepage: <span>Main</span>
        section.page-main__content
          form-default(:data="main")
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
      const entryIdMain = '7tT62M3wjYWqGMqOyAEoC2'

      const promise = Promise.all([
        api.fetchData(token, entryIdMain, false)
      ])

      return promise
        .then(res => {
          const [main] = res

          return { 
            main: main.data.data,
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
