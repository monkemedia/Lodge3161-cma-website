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
    textarea-field(
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.description"
      :disabled="isSaving"
      :errorText="errors.first('description')"
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
  import mixin from '@/plugins/mixins/common-api-functionality'
  import { lang } from '@/utils'

  Vue.use(VeeValidate)

  export default {
    mixins: [mixin],

    data () {
      return {
        formData: {
          title: this.data.fields.title[lang()],
          description: this.data.fields.description[lang()]
        },
        entryId: '7tT62M3wjYWqGMqOyAEoC2'
      }
    }
  }
</script>

<style lang="scss">
</style>
