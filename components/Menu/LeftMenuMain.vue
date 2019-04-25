<template lang="pug">
  aside.menu
    ul.menu-list
      li
        a.logo.tooltip.is-tooltip-right(data-tooltip="Dr James Griffith Hall Lodge")
          figure.image.is-32x32
            img(src="/logo.svg")
      li.menu-items
        nuxt-link.tooltip.is-tooltip-right(data-tooltip="Dashboard" to="/dashboard")
          i.fas.fa-tachometer-alt
      li.menu-items
        nuxt-link.tooltip.is-tooltip-right(data-tooltip="Pages" to="/templates")
          i.fas.fa-file-alt
      li.menu-items
        nuxt-link.tooltip.is-tooltip-right(data-tooltip="Blog" to="/blog/create")
          i.fas.fa-comment-dots
    ul.menu-list.menu-list--bottom
      li.menu-items.menu-items--bottom
        nuxt-link.avatar.tooltip.is-tooltip-right(to="/account/profile" data-tooltip="My account")
          figure.image.is-32x32
            img(v-if="profile && profile.media.file" :src="`${profile.media.file[lang].url}?h=32&f=face&fit=thumb`")
            img(v-else src="/default-avatar.jpg")
</template>

<script>
  // import _ from 'lodash'
  // import api from '@/api/contentful'
  import MenuItem from '@/components/Menu/MenuItem'
  import { lang } from '@/utils'
  // import draggable from 'vuedraggable'

  export default {
    name: 'LeftMenu',

    components: {
      MenuItem
    },

    data () {
      return {
        treeData: [
            {
                title: 'Dashboard',
                path: '/dashboard',
                isParent: true,
                name: 'dashboard'
            },
            {
                title: 'Pages',
                path: '/templates',
                subLinks: this.$store.getters['content/getAllData'],
                isParent: true,
                name: 'templates'
            },
            {
                title: 'News',
                path: '/news',
                subLinks: [{
                    title: 'Tets'
                }],
                isParent: true,
                name: 'news'
            }
        ],
        lang
      }
    },

    computed: {
      profile () {
        return this.$store.getters['profile/getProfileData']
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma-tooltip';
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  aside.menu {
    background: #181818;
    width: 60px;
    height: 100%;
    position: fixed;
    padding: 30px 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    a {
      text-align: center;
      padding-left: 0;
      padding-right: 0;

      &.nuxt-link-active,
      &:hover {
        background: #181818;

        i {
          color: #f5f5f5;
        }
      }
    }

    .logo {
      justify-content: center;
      align-items: center;
      display: flex;
      margin-bottom: 15px;
    }

    .menu-items {
      a {
        border-radius: 0;
        font-size: rem(24px);
        color: #4c4c4c;
        margin: 15px 0;
      }

      &--bottom {

        .avatar {
          width: 100%;
          margin: 0;
          display: flex;
          justify-content: center;

          figure {
            border-radius: 50%;
            overflow: hidden; 
          }
        }
      }
    }
  }
</style>