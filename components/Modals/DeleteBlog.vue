<template lang="pug">
   modal
    template(slot="title")
      h3.h1 Delete Page
    template(slot="body")
      p Are you sure you want to delete this post?
    template(slot="footer")
      .control
        button.button.is-primary(@click="deletePage" :class="{ 'is-loading': deletingIsLoading }") Delete post
        button.button.is-secondary(@click="closeModal") Cancel
</template>

<script>
  import api from '@/api/blog'
  import modal from '@/components/Modals/Index'

  export default {
    components: {
      modal
    },

    props: {
      pageId: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        deletingIsLoading: false
      }
    },

    created () {
      this.$nuxt.$on('close-modal', this.closeModal)
    },

    methods: {
      closeModal () {
        this.$emit('close')
      },

      deletePage () {
        const token = this.$store.getters['auth/getToken']

        this.deletingIsLoading = true

        api.deletePost(token, this.pageId)
          .then(() => {
            this.$emit('close')
            this.$toast.open({
              message: 'This post has been successfully deleted',
              type: 'is-success',
              duration: 5000,
              position: 'is-bottom-right',
              actionText: null
            })
            window.location.assign('/blog/create')
          })
          .catch(err => {
            console.log(err)
            this.deletingIsLoading = false
            this.$emit('close')
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../node_modules/sass-mq/mq';
  @import '~assets/css/utilities/variables.scss';

  .modal-card {
    @include mq($from: tablet) {
      width: 420px;
    }
  }

  .control {
    width: 100%;
    display: flex;
  }

  .button {
    flex: 1;
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
