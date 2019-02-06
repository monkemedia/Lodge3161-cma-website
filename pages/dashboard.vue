<template lang="pug">
  .columns
    .column.is-7
      .page-main
        header.header
          h1.h1 Dashboard
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
