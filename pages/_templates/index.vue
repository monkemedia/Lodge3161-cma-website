<template lang="pug">
  .columns
    .column.is-10
      .page-main
        header.header
          h1.h1 Pages
</template>

<script>
  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ]
  }
</script>

<style lang="scss" scoped>
</style>