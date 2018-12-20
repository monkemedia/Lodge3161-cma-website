<template lang="pug">
  form
    input-field(
      v-if="formData.title"
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :disabled="isSaving"
      :error-text="errors.first('title')"
    )
    input-field(
      v-if="formData.path"
      label="Path"
      name="path"
      placeholder=""
      v-validate="'required'"
      v-model="formData.path"
      :disabled="isSaving"
      :error-text="errors.first('path')"
    )

    save-publish-buttons(
      :is-publish="isPublish"
      :is-form-dirty="isFormDirty"
      :save-is-loading="saveIsLoading"
      :publish-is-loading="publishIsLoading"
      :any-form-errors="errors.items.length <= 0"
      @click="saveForm"
    )

    .last-saved.has-text-right
      p Last saved {{ lastSaved }}

</template>

<script>
  import mixin from '@/plugins/mixins/common-api-functionality'
  import { lang } from '@/utils'

  export default {
    mixins: [mixin],

    data () {
      return {
        formData: {
          title: this.data.fields.title ? this.data.fields.title[lang()] : null,
          path: this.data.fields.path ? this.data.fields.path[lang()] : null,
          // slug: this.data.fields.slug ? this.data.fields.slug[lang()] : null
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
