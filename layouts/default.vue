<template lang="pug">
  div
    main-header
    main
      nuxt
</template>

<script>
  import MainHeader from '~/components/Header/MainHeader.vue'

  export default {
    name: 'DefaultLayout',

    components: {
      MainHeader
    }
  }
</script>

<style>

</style>
