<template lang="pug">
  .field.is-grouped.is-grouped-right
    .control
      button.button.is-success(:disabled="!isFormDirty || !anyFormErrors" :class="{ 'is-loading': saveIsLoading }" @click.prevent="$emit('click', false)") Save
</template>

<script>
  export default {
    props: {
      isFormDirty: {
        type: Boolean,
        required: true
      },

      saveIsLoading: {
        type: Boolean,
        required: true
      },

      anyFormErrors: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
   .button {
      min-width: 211px;
    }
</style>
