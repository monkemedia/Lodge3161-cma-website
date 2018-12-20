<template lang="pug">
  .notification.is-danger(
    v-if="errorMessage" 
    :class="{ 'is-error': errorMessage }")
    p {{ errorMessage }}
</template>

<script>
  export default {
    props: {
      errorMessage: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>