<template lang="pug">
  aside.menu
    ul.menu-list
      li
        a.logo.tooltip.is-tooltip-right(data-tooltip="Dr James Griffith Hall Lodge")
          figure.image.is-32x32
            img(src="logo.svg")
      li.menu-items
        nuxt-link.tooltip.is-tooltip-right(data-tooltip="Dashboard" to="/templates")
          i.fas.fa-tachometer-alt
      li.menu-items
        a.tooltip.is-tooltip-right(data-tooltip="Pages")
          i.fas.fa-file-alt
</template>

<script>
  // import _ from 'lodash'
  // import api from '@/api/contentful'
  import MenuItem from '@/components/Menu/MenuItem'
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
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import 'bulma';
  @import '~bulma-tooltip';
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  aside.menu {
    background: #181818;
    width: 60px;
    height: 100%;
    position: fixed;
    padding: 30px 0;

    a {
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
        display: flex;
        justify-content: center;
        font-size: rem(24px);
        color: #4c4c4c;
        margin: 15px 0;
      }
    }
  }

  .sticky {
    position: sticky;
    top: 0;
    width: 100%;
  }
</style>