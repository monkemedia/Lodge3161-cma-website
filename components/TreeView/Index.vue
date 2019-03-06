<template lang="pug">
  ul.menu-tree
    li(v-for="item in items" :item="item" :key="item.id" is="menu-tree-item") 
    li
      .add-page(@click="createModal")
        span.icon
          i.fas.fa-plus
        span Add Page

</template>

<script>
  import MenuTreeItem from '@/components/TreeView/MenuTreeItem'
  import CreateModal from '@/components/Modals/Create'

  export default {
    name: 'TreeView',

    components: {
      MenuTreeItem,
      CreateModal
    },

    props: {
      items: {
        type: Array
      }
    },

    methods: {
      createModal () {
        this.$modal.open({
            parent: this,
            component: CreateModal,
            hasModalCard: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';

  .add-page {
    height: 38px;
    padding: 0 30px;
    display: flex;
    font-size: rem(13px);
    align-items: center;
    cursor: pointer;
    position: relative;
  }
</style>