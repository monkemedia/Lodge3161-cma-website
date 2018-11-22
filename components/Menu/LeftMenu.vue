<template lang="pug">
  aside.aside
    nav
      ul.accordions
        li.accordion(v-for="m in menu" :class="{ 'is-active' : toggle }")
          a.accordion-header(@click="toggle = !toggle") {{ m.page }}
          .accordion-body
            ul.accordion-content
              li(v-for="link in m.links")
                a {{ link.component }}
        </article>
</template>

<script>
  export default {
    name: 'LeftMenu',

    data () {
      return {
        toggle: false,
        menu: [
          {
            page: 'Homepage',
            links: [
              {
                component: 'Main',
                path: '/homepage'
              }
            ]
          }
        ]
      }
    }
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

      &:after {

      }

      &.nuxt-link-exact-active {
        background: $grey-light;
        color: $white;
      }
    }
  }

</style>