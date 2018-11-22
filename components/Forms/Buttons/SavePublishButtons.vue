<template lang="pug">
  .field.is-grouped.is-grouped-right.is-marginless
    .control
      button.button.is-white(:disabled="!isFormDirty" :class="{ 'is-loading': saveIsLoading }" @click.prevent="$emit('click', false)") Save
      button.button.is-primary(v-if="!isPublish" :disabled="!isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
      button.button.is-primary(v-if="isPublish && !isFormDirty" :disabled="!isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
      button.button.is-primary(v-if="isPublish && isFormDirty" :disabled="isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
</template>

<script>
  export default {
    props: {
      isPublish: {
        type: Boolean,
        required: true
      },

      isFormDirty: {
        type: Boolean,
        required: true
      },

      saveIsLoading: {
        type: Boolean,
        required: true
      },

      publishIsLoading: {
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
   .button {
      min-width: 200px;
    }
</style>
