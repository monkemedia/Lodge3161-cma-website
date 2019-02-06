<template lang="pug">
  .columns.is-centered
    .column.is-7
      .page-main
        header.header.has-text-centered
          h1.h1(v-if="error.statusCode === 404") Page not found
          h1.h1(v-else) An error occurred
          p {{ error.message }}
          nuxt-link.link(to="/") Return to Homepage
</template>

<script>
  export default {
    layout: 'loggedIn',

    props: ['error']
  }
</script>

<style lang="scss" scoped>
</style>
