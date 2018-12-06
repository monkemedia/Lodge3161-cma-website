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
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.image.title"
      :disabled="isSaving"
      :errorText="errors.first('title')"
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
  import { lang } from '@/utils/index'
  import DropBox from '@/components/Forms/Fields/DropBox'

  Vue.use(VeeValidate)

  export default {
    mixins: [mixin],

    components: {
      DropBox
    },

    data () {
      return {
        formData: {
          image: {
            title: this.data.fields.title[lang()],
            file: {
              url: this.data.fields.file[lang()].url,
              fileName: this.data.fields.file[lang()].fileName,
              contentType: this.data.fields.file[lang()].contentType
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
