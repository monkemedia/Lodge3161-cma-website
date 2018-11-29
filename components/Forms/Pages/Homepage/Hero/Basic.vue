<template lang="pug">
  form
    input-field(
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :disabled="isSaving"
      :errorText="errors.first('title')"
    )
    input-field(
      label="Subtitle"
      name="subtitle"
      placeholder=""
      v-validate="'required'"
      v-model="formData.subtitle"
      :disabled="isSaving"
      :errorText="errors.first('subtitle')"
    )

    save-publish-buttons(
      :isPublish="isPublish"
      :isFormDirty="isFormDirty"
      :saveIsLoading="saveIsLoading"
      :publishIsLoading="publishIsLoading"
      :anyFormErrors="errors.items.length <= 0"
      @click="saveForm"
    )

    .last-saved.has-text-right
      p Last saved {{ lastSaved }}
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import mixin from '@/plugins/mixins/common-api-functionality.js'

  Vue.use(VeeValidate)

  export default {
    mixins: [mixin],

    data () {
      return {
        formData: {
          title: this.data.fields.title,
          subtitle: this.data.fields.subtitle,
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../../../node_modules/sass-rem/rem';
  @import '~assets/css/utilities/variables.scss';

  .last-saved p {
    font-size: rem(12px);
  }
</style>
