<template lang="pug">
  .field.is-grouped.is-grouped-right
    .control
      button.button.is-secondary(@click.prevent="$emit('delete-modal')" v-if="isParent && pageType === 'pages'") Delete Page
    .control
      button.button.is-secondary(:disabled="!isFormDirty || !anyFormErrors" :class="{ 'is-loading': saveIsLoading }" @click.prevent="$emit('click', false)") Save
    .control
      button.button.is-secondary(v-if="!isPublish" :disabled="!isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
      button.button.is-secondary(v-if="isPublish && !isFormDirty" :disabled="!isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
      button.button.is-secondary(v-if="isPublish && isFormDirty" :disabled="isPublish" :class="{ 'is-loading': publishIsLoading }" @click.prevent="$emit('click', true)") Publish
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

      deletingIsLoading: {
        type: Boolean,
        required: true
      },

      anyFormErrors: {
        type: Boolean,
        required: true
      },

      pageType: {
        type: String,
        required: false
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
    min-width: 211px;
  }
</style>
