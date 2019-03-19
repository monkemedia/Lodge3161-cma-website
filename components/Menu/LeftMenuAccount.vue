<template lang="pug">
  aside
    article
      h4.title Account
      p At vero eos et accusam et iusto odio ducimus qui.
    ul.menu
      li
        nuxt-link(to="/account/profile")
          span.icon
            i.far.fa-file
          span Profile
</template>

<script>
  export default {
    name: 'LeftMenuAccount',

    computed: {
      items () {
        return this.$store.getters['pages/getPagesData']
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  aside {
    background-color: #f7f7f7;
    border-right: 1px solid #e0e0e0;
    padding: 30px 0;
    width: 240px;
    min-height: 100vh;
  }

  article {
    padding: 0 30px 20px;

    .title {
      font-size: rem(16px);
      margin-bottom: 10px !important;
    }

    p {
      font-size: rem(11px);
    }
  }

  .menu {
    li {
      a {
        height: 38px;
        align-items: center;
        display: flex;
        padding: 0 30px;
        font-size: rem(13px);

        &.nuxt-link-exact-active,
        &:hover {
          background: #e9e9e9;
        }
      }
    }
  }

</style>