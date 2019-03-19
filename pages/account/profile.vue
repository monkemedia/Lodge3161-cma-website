<template lang="pug">
  main.main
    left-menu-account
    section.section
      .container.is-fluid
        .columns
          .column
            header.header
              h1.h1 My Account
            section
              h2.h2 Profile
              figure.avatar.image.is-96x96
                img(:src="`${profile.media.file[lang].url}?h=96&q=80`" :alt="profile.media.title[lang]")
              p {{ profile.fields.firstName[lang] }} {{ profile.fields.lastName[lang] }}
              p {{ profile.fields.about[lang] }}
              button(@click="editProfileModal") Edit
</template>

<script>
  import { lang } from '@/utils'
  import editProfileModal from '@/components/Modals/EditProfile'
  import LeftMenuAccount from '@/components/Menu/LeftMenuAccount'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      LeftMenuAccount
    },

    data () {
      return {
        lang: lang
      }
    },

    computed: {
      profile () {
        return this.$store.getters['profile/getProfileData']
      }
    },

    methods: {
      editProfileModal () {
        const props = {
          data: this.profile
        }
        this.$modal.open({
          parent: this,
          component: editProfileModal,
          hasModalCard: true,
          props
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar {
    img {
      border-radius: 50%;
    }
  }
</style>
