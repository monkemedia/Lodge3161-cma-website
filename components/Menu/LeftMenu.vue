<template lang="pug">
  aside.aside
    nav.menu
      ul.menu-list
        li
          nuxt-link(to="/") Dashboard
        li
          nuxt-link(to="/") Customers
</template>

<script>
  export default {
    name: 'LeftMenu'
  }
</script>

<style lang="scss">
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  .aside {
    background: #fff;
    padding: 0 0 0 10px;
    min-height: 100vh;
  }

  .menu {
    font-weight: bold;
    font-size: $size-130;
  }

  .menu-list {
    padding-top: 12px;

    a {
      padding: 20px 30px;
      border-bottom: 1px solid $grey-lighter;
    }
  }

</style>