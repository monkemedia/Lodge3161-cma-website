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
    padding-top: 0;
    padding-bottom: 0;
  }

  .menu {
    font-weight: bold;
    font-size: $size-120;
    background: #fff;
    min-height: 100vh;
    border-left: 1px solid $grey-200;
    border-right: 1px solid $grey-200;
  }

  .menu-list {
    a {
      padding: 25px 30px;
      border-bottom: 1px solid $grey-lighter;
    }
  }

</style>