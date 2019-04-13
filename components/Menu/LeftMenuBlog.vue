<template lang="pug">
  aside
    article
      h4.title Blog
      p At vero eos et accusam et iusto odio ducimus qui.
    ul.menu
      li(v-for="post in getPosts")
        nuxt-link(:to="post.path")
          span.icon
            i.far.fa-file
          span {{ post.title }}
          span.icon.icon-delete.is-small(@click.prevent="deleteModal(post.id)")
            i.far.fa-trash-alt
      li
        nuxt-link(to="/blog/create")
          span.icon
            i.fas.fa-plus
          span Add post
</template>

<script>
  import DeleteBlogModal from '@/components/Modals/DeleteBlog'

  export default {
    name: 'LeftMenuAccount',

    components: {
      DeleteBlogModal
    },

    methods: {
      logout () {
        return this.$store.dispatch('auth/logout')
          .then(() => {
            this.$router.push({ path: '/login' })
          })
      },

      deleteModal (id) {
        this.$modal.open({
          parent: this,
          component: DeleteBlogModal,
          hasModalCard: true,
          props: {
            pageId: id
          }
        })
      }
    },

    computed: {
      getPosts () {
        return this.$store.getters['blog/getPosts']
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  aside {
    background-color: $grey-lighter;
    border-right: 1px solid $grey;
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
        position: relative;
        z-index: 0;

        &.nuxt-link-exact-active,
        &:hover {
          background: $grey-light;
        }

        .icon-delete {
          position: absolute;
          cursor: pointer;
          transition: all .2s ease-in-out;
          opacity: .8;
          z-index: 2;

          &:hover {
            i {
              color: $primary;
              opacity: 1;
            }
          }
        }

        &:hover {
          .icon-delete{
            transform: translatex(0);
          }
        }

        .icon-delete {
          left: 5px;
          transform: translatex(-160%);
          top: 10px;

          i {
            font-size: rem(11px);
          }
        }
      }
    }
  }

</style>