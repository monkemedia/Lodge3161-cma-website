<template lang="pug">
  .field.is-grouped.is-grouped-right.is-marginless
    .control
      button.button.is-secondary(:class="{ 'is-loading': saveIsLoading }" @click.prevent="$emit('delete-page')" v-if="isParent") Delete Page

      button.button(:disabled="!isFormDirty || !anyFormErrors" :class="{ 'is-loading': saveIsLoading }" @click.prevent="$emit('click', false)") Save

      button.button(v-if="!isPublish" :disabled="!isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
      button.button(v-if="isPublish && !isFormDirty" :disabled="!isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
      button.button(v-if="isPublish && isFormDirty" :disabled="isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
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
      },

      anyFormErrors: {
        type: Boolean,
        required: true
      }
    },

    computed: {
      isParent () {
        return this.$route.query.isParent
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';

  .button {
    width: 33.3333%;
    border-top: 1px solid $grey-300;
    border-bottom: 1px solid $grey-300;
    border-right: 1px solid $grey-300;
    background: $white;

    &:last-child {
      border-right: 0;
    }
  }
</style>
