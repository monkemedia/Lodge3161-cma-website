<template lang="pug">
  .columns.is-centered
    .column.is-8
      section.section
        b-tabs(v-model="activeTab")
          b-tab-item(label="Basic")
            basic-form(:data="basic")
          b-tab-item(label="Media")
            p test
        
</template>

<script>
  import apiBasic from '@/api/homepage/hero/basic'
  // import apiMedia from '@/api/homepage/hero/media'
  import basicForm from '@/components/Forms/Pages/Homepage/Hero/Basic'
  // import mediaForm from '@/components/Forms/Pages/Homepage/Hero/Media'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      basicForm,
      // mediaForm
    },

    asyncData ({ store }) {
      const token = store.getters['auth/getToken']

      return apiBasic.fetchData(token)
        .then(res => {
          console.log('res', res);
          return { basic: res.data.data }
        })
        // .then(() => {
        //   return apiMedia.fetchData(token)
        // })
        // .then(res => {
        //   return res.media
        // })
    },

    data () {
      return {
        activeTab: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .section {
    padding-top: 80px;
  }
</style>
