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
                img(v-if="profile && profile.media.file" :src="`${profile.media.file[lang].url}?h=96&f=face&fit=thumb`" :alt="profile.media.title[lang]")
                img(v-else src="/default-avatar.jpg" alt="Please add an avatar")  
              ul.profile-table
                li
                  span.label First name:
                  span.value(v-if="profile") {{ profile.fields.firstName[lang] }}
                  span.value(v-else) Please add your first name
                li
                  span.label Last name:
                  span.value(v-if="profile") {{ profile.fields.lastName[lang] }}
                  span.value(v-else) Please add your last name
                li
                  span.label Bio:
                  span.value(v-if="profile") {{ profile.fields.about[lang] }}
                  span.value(v-else) Please add a short description about yourself here
              button.button.is-primary(@click="editProfileModal") Edit
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
        const getProfileData = this.$store.getters['profile/getProfileData']

        if (getProfileData) {
          return getProfileData
        } 
        return ''
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
  @import '~assets/css/utilities/variables.scss';

  .h2 {
    margin-bottom: 20px;
  }

  .avatar {
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid $grey;
  }

  .profile-table {
    li {
      font-size: rem(14px);
      border-bottom: 1px solid #e0e0e0;
      padding: 12px 0;
      display: flex;

      &:last-child {
        border: 0;
      }

      .label {
        margin-bottom: 0;
        flex: 1;
        font-weight: bold;
      }

      .value {
        flex: 3;
      }
    }
  }
</style>
