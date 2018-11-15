<template lang="pug">
  #top(v-cloak)
    p hello

</template>

<script>
  // import HeaderHomepage from '@/components/Headers/HeaderHomepage.vue'

  export default {
    components: {
    },

    async fetch ({ store }) {
    },

    mounted () {
      if (!process.client) return

      // return this.$store.dispatch('homepage/fetchData')
    },

    computed: {
      homepage () {
        return this.$store.getters['homepage/getData']
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
