<template lang="pug">
  div
    main-header
    .columns
      left-menu.column.is-2
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

<style>

</style>
