<template lang="pug">
  form
    drop-box(
      :data="formData"
      :isSaving="isSaving"
      v-model="formData.image.file"
      v-validate="'required'"
      name="dropBox"
      @dropbox="updateData")

    input-field(
      label="Alt"
      name="alt"
      placeholder=""
      v-validate="'required'"
      v-model="formData.image.alt"
      :disabled="isSaving"
      :error-text="errors.first('alt')"
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
  import { lang } from '@/utils/index'
  import DropBox from '@/components/Forms/Fields/DropBox'

  export default {
    mixins: [mixin],

    components: {
      DropBox
    },

    data () {
      return {
        formData: {
          image: {
            alt: this.data.fields.title ? this.data.fields.title[lang()] : null,
            file: {
              url:  this.data.fields.file ? this.data.fields.file[lang()].url : null,
              fileName: this.data.fields.file ? this.data.fields.file[lang()].fileName : null,
              contentType: this.data.fields.file ? this.data.fields.file[lang()].contentType : null
            }
          }
        },
        isAsset: true
      }
    },

    methods: {
      updateData (data) {
        this.formData.image.file.url = data.url
        this.formData.image.file.fileName = data.fileName
        this.formData.image.file.contentType = data.contentType
      }
    }
  }
</script>

<style lang="scss">

</style>
