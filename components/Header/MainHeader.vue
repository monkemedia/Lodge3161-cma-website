<template lang="pug">
  header
    .columns
      .column
        nav.navbar(role="navigation" aria-label="main navigation")
          .navbar-brand
            nuxt-link.navbar-item.is-brand.navbar-brand-logo(to="/")
              img(src="logo.svg" alt="Dr James Griffith Hall Lodge - CMA")

          .navbar-menu.navbar-end#navMenu
            nuxt-link.navbar-item.is-hoverable.account(v-if="!isAuthenticated" to="/login")
              span.icon.is-small
                i.fas.fa-user-circle
              | Sign in
            .navbar-item.has-dropdown.is-hoverable.account(v-else)
              a.navbar-link
                | Welcome {{ userDetails.firstName }}

              .navbar-dropdown.is-right
                nuxt-link.navbar-item(to="/")
                  | Profile
                a.navbar-item(@click="logout")
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
    border-left: 1px solid $grey-200;
  }

  .account {
    border-right: 1px solid $grey-200;
    border-left: 1px solid $grey-200;

    .icon {
      margin-right: 5px !important;
    }
  }
</style>