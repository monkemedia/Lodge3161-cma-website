<template lang="pug">
  draggable(
    :options="{ disabled : (!model.isDraggable || isActive)}"
    v-model="model.subLinks" 
    @start="drag=true" 
    @end="drag=false" 
    @change="updateApiOrder")
    li(:class="[ isFolder ? 'folder' : '', isActive ? 'open' : '', model.isDraggable ? 'draggable' : '', model.name ]")
      label(
        exact
        @click="toggle"
        @dblclick="changeType")
        span(v-if="model.name === 'homepage'") Homepage 
        span(v-else) {{ removeCamelCase(model.title) }}
      ul(v-show="isActive" v-if="isFolder")
        menu-item(
          v-for="(model, ind) in model.subLinks"
          :key="ind"
          :index="ind"
          :model="model")
        li.add(@click="createModal" v-if="model.name === 'templates'")
          label
            i.fas.fa-plus.plus-icon 
            span Add New Page
</template>

<script>
  import _ from 'lodash'
  import Vue from 'vue'
  import api from '@/api/contentful'
  import Draggable from 'vuedraggable'
  import createModal from '@/components/Modals/Create'
  // import api from '@/api/contentful'
  // import draggable from 'vuedraggable'

  export default {
    name: 'MenuItem',

    components: {
      Draggable,
    },

    props: {
      model: Object,
      index: Number
    },

    data () {
      return {
        open: false,
        isActive: false
      }
    },

    mounted () {    
      // this.activateMenuOnLoad()
    },

    computed: {
      isFolder () {
        return this.model.subLinks && this.model.subLinks.length
      },

      isEntry () {
        return this.model.title === this.$route.query.entries
      }
    },

    methods: {
      toggle () {
        this.$router.push(this.model.path + (this.model.id ? '/' + this.model.id : '') + (this.model.title ? '?entries=' + this.model.title : '') + (this.model.isParent ? '&isParent=' + this.model.isParent : ''))

        if (this.isFolder) {
          this.isActive = !this.isActive
        }
      },

      changeType () {
        if (!this.isFolder) {
          Vue.set(this.model, 'subLinks', [])
          this.addChild()
          this.open = true
        }
      },

      createModal () {
        this.$modal.open({
          parent: this,
          component: createModal,
          hasModalCard: true
        })
      },

      updateApiOrder ({ publishable }) {
        const token = this.$store.getters['auth/getToken']
        const publish = publishable || false
        const promises = []

        this.pages.forEach((page, index) => {
          const entryId = page.id
          const formData = {
            order: index
          }
          if (page.path === 'home') { return } // Ignore homepage

          promises.push(api.updateData(token, formData, publish, entryId))
        })

        return Promise.all(promises)
          .then(res => {
            if (!publish) {
              this.updateApiOrder({ publishable: true })
              return
            }
            this.$toast.open({
              message: 'These changes are now live',
              type: 'is-success',
              duration: 5000,
              position: 'is-bottom-right',
              actionText: null
            })
          })
      },

      removeCamelCase (string) {
        return _.startCase(string);
      }
    },
  }
</script>

<style lang="scss">
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  .sticky {
    position: sticky;
    top: 0;
    width: 209px;
  }

  .plus-icon {
    margin-right: 8px;
  }

  .aside {
    padding-top: 0;
    padding-bottom: 0;
  }
</style>