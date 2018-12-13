<template lang="pug">
  div.container
    main-header
    .columns.is-gapless
      left-menu
      main.column.is-10
        nuxt
</template>

<script>
  import MainHeader from '~/components/Header/MainHeader.vue'
  import LeftMenu from '~/components/Menu/LeftMenu.vue'

  export default {
    name: 'DefaultLayout',

    components: {
      MainHeader,
      LeftMenu
    }
  }
</script>

<style lang="scss">

</style>
