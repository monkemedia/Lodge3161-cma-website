<template lang="pug">
   modal
    template(slot="title")
      h3.h1 Create Page
    template(slot="body")
      create-form
</template>

<script>
  import modal from '@/components/Modals/Index'
  import createForm from '@/components/Forms/Create'

  export default {
    components: {
      modal,
      createForm
    },

    created () {
      this.$nuxt.$on('close-modal', this.closeModal)
    },

    methods: {
      closeModal () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss">
</style>
