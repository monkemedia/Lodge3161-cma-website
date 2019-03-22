<template lang="pug">
   modal
    template(slot="title")
      h3.h1(v-if="data") Edit profile
      h3.h1(v-else) Create profile
    template(slot="body")
      edit-profile-form(:data="data")
</template>

<script>
  import modal from '@/components/Modals/Index'
  import editProfileForm from '@/components/Forms/EditProfile'

  export default {
    components: {
      modal,
      editProfileForm
    },

    props: {
      data: {
        type: [Object, String],
        required: false
      }
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
