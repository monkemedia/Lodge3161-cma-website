<template lang="pug">
    li.menu-tree--item(:class="{ 'is-open' : item.isActive }") 
      .menu-tree--header(@click="item.isActive = !item.isActive" :class="{ 'is-root' : item.children.length > 0 }")
        span.icon
          i.far.fa-folder(v-if="item.children.length > 0") 
          i.far.fa-file(v-else)
        span {{ item.name }}
        span.icon.icon-delete.is-small(@click="deleteModal(item.id)")
          i.far.fa-trash-alt
      ul.menu-tree--content(v-if="item.children.length > 0" v-show="item.isActive")
        li.child(v-for="child in item.children") 
          nuxt-link(:to="`${child.path}/${child.id}`")
            span.icon
              i.far.fa-file
            span {{ child.name }}
</template>

<script>
  import DeleteModal from '@/components/Modals/Delete'
  import createModal from '@/components/Modals/Create'

  export default {
    name: 'TreeView',

    components: {
      DeleteModal
    },

    props: {
      item: {
        type: Object
      }
    },

    mounted () {
      if (this.$route.params.slug === this.item.name) {
        this.item.isActive = true
      }
    },

    methods: {
      deleteModal (id) {
        this.$modal.open({
          parent: this,
          component: DeleteModal,
          hasModalCard: true,
          props: {
            pageId: id
          }
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
  @import '~assets/css/utilities/mixins.scss';


  a {
    color: $secondary;
    height: 100%;
    display: flex;
    font-size: rem(13px);
    align-items: center;
    cursor: pointer;
    padding: 0 30px;
  }

  .icon {
    margin-right: 4px;
    i {
      font-size: rem(16px);
    }
  }

  .menu-tree {
    &--item {
      &.is-open {
        .menu-tree--header {
          &:after {
            content: '\f078';
            color: $secondary;
          }
        }
      }
    }

    &--header {
      height: 38px;
      padding: 0 30px;
      display: flex;
      font-size: rem(13px);
      align-items: center;
      cursor: pointer;
      position: relative;

      &.is-root {
        &:after {
          font-family: 'Font Awesome 5 Free';
          content: '\f053';
          font-weight: 900;
          width: 6px;
          height: 13px;
          font-size: rem(9px);
          position: absolute;
          right: 30px;
          color: #c5c5c5;
        }
      }
    }

    &--header {
      &:hover {
        &:after {
          color: $secondary;
        }
      }

      .icon-delete {
        position: absolute;
        left: 5px;
        top: 10px;
        cursor: pointer;
        transform: translatex(-160%);
        transition: all .2s ease-in-out;
        opacity: .8;

        &:hover {
          i {
            color: $primary;
            opacity: 1;
          }
        }

        i {
          font-size: rem(11px);
        }
      }

      &:hover {
        .icon-delete {
          transform: translatex(0);
        }
      }
    }
  }

  .child {
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;

    &:hover {
      background: #e9e9e9;
    }

    a {
      padding-left: 54px;
      width: 100%;

      &:before {
        background: url('/menu-tree-line.png') no-repeat 0 0;
        content: '';
        display: block;
        height: 45px;
        position: absolute;
        width: 10px;
        left: 40px;
      }
    }

    &:last-child {
      a {
        &:before {
          background: url('/menu-tree-line-last-child.png') no-repeat 0 0;
        }
      }
    }
  }

</style>