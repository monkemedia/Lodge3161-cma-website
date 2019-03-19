<template lang="pug">
    li.menu-tree--item(:class="{ 'is-open' : item.isActive }") 
      .menu-tree--header(@click="item.isActive = !item.isActive" :class="{ 'is-root' : item.children.length > 0 }")
        span.icon
          i.far.fa-folder(v-if="item.children.length > 0") 
          i.far.fa-file(v-else)
        span {{ removeCamelCase(item.name) }}
        span.icon.icon-delete.is-small(@click.stop="deleteModal(item.id)")
          i.far.fa-trash-alt
        span.icon.icon-settings.is-small(@click.stop="goToSettings(item)")
          i.fas.fa-cog
      ul.menu-tree--content(v-if="item.children.length > 0" v-show="item.isActive")
        li.child(v-for="child in item.children" v-if="child.name !== 'pageMeta'") 
          nuxt-link(:to="`${child.path}/${child.id}`")
            span.icon
              i.far.fa-file
            span {{ removeCamelCase(child.name) }}
</template>

<script>
  import _ from 'lodash'
  import DeleteModal from '@/components/Modals/Delete'

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

      removeCamelCase (string) {
        return _.startCase(string);
      },

      goToSettings (item) {
        console.log(item)
        const pageMetaName = item.children.filter(it => {
          return it.name === 'pageMeta'
        })

        console.log('pageMetaName', pageMetaName[0])
        return this.$router.push(`${item.path}/${pageMetaName[0].id}`)
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
        background: #e9e9e9;

        &:after {
          color: $secondary;
        }
      }

      .icon-delete,
      .icon-settings {
        position: absolute;
        cursor: pointer;
        transition: all .2s ease-in-out;
        opacity: .8;
        z-index: 1;

        &:hover {
          i {
            color: $primary;
            opacity: 1;
          }
        }
      }

      &:hover {
        .icon-delete,
        .icon-settings {
          transform: translatex(0);
        }

        .icon-settings {
          i {
            opacity: 1;
          }
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

      .icon-settings {
        right: 50px;
        top: 11px;

        i {
          font-size: rem(13px);
          opacity: 0;
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