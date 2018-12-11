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
      :errorText="errors.first('title')"
    )
    input-field(
      v-if="formData.path"
      label="Path"
      name="path"
      placeholder=""
      v-validate="'required'"
      v-model="formData.path"
      :disabled="isSaving"
      :errorText="errors.first('path')"
    )
    //- input-field(
    //-   v-if="formData.slug"
    //-   label="Path"
    //-   name="slug"
    //-   placeholder=""
    //-   v-validate="'required'"
    //-   v-model="formData.slug"
    //-   :disabled="isSaving"
    //-   :errorText="errors.first('slug')"
    //- )

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
