<template lang="pug">
  main.main
    left-menu-pages
    section.section
      .container.is-fluid
        .columns
          .column
            header.header
              h1.h1 Pages
</template>

<script>
  import LeftMenuPages from '@/components/Menu/LeftMenuPages'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      LeftMenuPages
    },
  }
</script>

<style lang="scss" scoped>
  main {
    display: flex;
  }

  section {
    flex: 1;
  }

  header {
    padding-top: 20px;
  }
</style>