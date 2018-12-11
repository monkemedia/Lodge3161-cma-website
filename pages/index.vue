<template lang="pug">
  .columns.is-centered
    .column.is-8
      .page-main
        header.header.has-text-centered
          h1.h1 Index
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
