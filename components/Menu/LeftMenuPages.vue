<template lang="pug">
  aside
    article
      h4.title Pages
      p At vero eos et accusam et iusto odio ducimus qui.
    tree-view(:items="items")
</template>

<script>
  import TreeView from '@/components/TreeView'

  export default {
    name: 'LeftMenu',

    components: {
      TreeView
    },

    data () {
      return {
        // items: [{
        //   name: 'Root',
        //   children: [
        //     {
        //       name: 'First Child'
        //     },
        //     {
        //       name: 'Second Child',
        //       children: [
        //         {
        //           name: 'Grandchild 1'
        //         },
        //         {
        //           name: 'Grandchild 2'
        //         }
        //       ]
        //     }
        //   ]
        // }]
      }
    },

    computed: {
      items () {
        return this.$store.getters['pages/getPagesData']
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  aside {
    background-color: #f7f7f7;
    border-right: 1px solid #e0e0e0;
    // position: fixed;
    // height: 100%;
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

</style>