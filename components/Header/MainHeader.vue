<template lang="pug">
  header
    nav.navbar(role="navigation" aria-label="main navigation")
      .navbar-brand
        nuxt-link.navbar-item.is-brand.navbar-brand-logo(to="/")
          img.navbar-brand-logo(src="logo.svg" alt="Dr James Griffith Hall Lodge - CMA")
        nuxt-link.navbar-item.is-tab.is-hidden-mobile(to="/") Features

      .navbar-menu.navbar-end#navMenu
        nuxt-link.navbar-item.is-hoverable.sign-in(v-if="!isAuthenticated" to="/login")
          span.icon.is-small
            i.fas.fa-user-circle
          | Sign in
        .navbar-item.has-dropdown.is-hoverable(v-else)
          a.navbar-link
            figure.image.is-32x32
              img(src="https://avatars1.githubusercontent.com/u/7221389?v=4&amp;s=32")
            | {{ userDetails.firstName }}

          .navbar-dropdown.is-right
            nuxt-link.navbar-item(to="/")
              span.icon.is-small
                i.fa.fa-user-o
              | Profile
            hr.navbar-divider
            a.navbar-item(@click="logout")
              span.icon.is-small
                i.fa.fa-power-off
              | Logout
</template>

<script>
  export default {
    name: 'MainHeader',

    computed: {
      userDetails () {
        return this.$store.getters['auth/getUser']
      },

      isAuthenticated () {
        return this.$store.getters['auth/isAuthenticated']
      }
    },

    methods: {
      logout () {
        return this.$store.dispatch('auth/logout')
          .then(() => {
            console.log('logged out successfully')
          })
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/css/utilities/variables.scss';

  .navbar {
    border-bottom: 1px solid $grey-200;
  }

  .sign-in {
    .icon {
      margin-right: 5px !important;
    }
  }
</style>