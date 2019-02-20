<template lang="pug">
  nav.navbar(role="navigation" aria-label="main navigation")
    .navbar-brand
      nuxt-link.navbar-item.is-brand.navbar-brand-logo(to="/")
        img(src="/logo.svg" alt="Dr James Griffith Hall Lodge - CMA")

    .navbar-menu.navbar-end#navMenu
      b-tooltip(label="Create new page" type="is-dark" position="is-bottom" square)
        a.navbar-item(@click="createModal")
          span.icon
            i.fas.fa-plus
      nuxt-link.navbar-item.is-hoverable.account(v-if="!isAuthenticated" to="/login")
        span.icon.is-small
          i.fas.fa-user-circle
        | Sign in

      .navbar-item.has-dropdown.is-hoverable.account(v-else)
        a.navbar-link
          | Welcome {{ userDetails.firstName }}

        .navbar-dropdown.is-right
          nuxt-link.navbar-item(to="/account/profile")
            | Profile
          a.navbar-item(@click="logout")
            | Logout
</template>

<script>
  import createModal from '@/components/Modals/Create'

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
            this.$router.push({ path: '/login' })
          })
      },

      createModal () {
        this.$modal.open({
            parent: this,
            component: createModal,
            hasModalCard: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';

  .account {
    .icon {
      margin-right: 5px !important;
    }
  }
</style>