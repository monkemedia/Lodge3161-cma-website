<template lang="pug">
  div
    left-menu
    nuxt
</template>

<script>
  import MainHeader from '~/components/Header/MainHeader.vue'
  import LeftMenu from '~/components/Menu/LeftMenuMain.vue'

  export default {
    name: 'DefaultLayout',

    components: {
      MainHeader,
      LeftMenu
    }
  }
</script>

<style lang="scss" scoped>

</style>
