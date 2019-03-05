<template lang="pug">
  div
    legend Button
    .message.is-light
      .message-body
        input-field(
          label="Title"
          name="title"
          placeholder=""
          v-validate="'required'"
          v-model="buttonData.fields.title[lang]"
          :disabled="isSaving"
          :error-text="errors.first('title')"
          @input="hasChanged")

        input-field(
          label="Path"
          name="path"
          placeholder=""
          v-validate="'required'"
          v-model="buttonData.fields.path[lang]"
          :disabled="isSaving"
          :error-text="errors.first('path')"
          @input="hasChanged")

</template>

<script>
  import { lang } from '@/utils'

  export default {
    props: {
      buttonData: {
        type: Object,
        required: true
      },

      isSaving: {
        type: Boolean,
        required: true
      }
    },

    data () {
      return {
        lang
      }
    },

    methods: {
      hasChanged () {
        this.$emit('isFormDirty', true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/mixins.scss';

  legend {
    margin-bottom: 15px;
    @include Bold();
  }
</style>
