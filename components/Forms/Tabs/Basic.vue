<template lang="pug">
  form
    checkbox-field(
      v-if="formData.mainNavigation !== null"
      label="Add to navigation"
      name="mainNavigation"
      placeholder=""
      v-validate="'required'"
      v-model="formData.mainNavigation"
      :disabled="isSaving"
    )

    input-field(
      v-if="formData.slug !== null && formData.slug.length >= 0"
      label="Slug"
      name="slug"
      placeholder=""
      v-validate="'required'"
      v-model="formData.slug"
      :disabled="isSaving"
      :errorText="errors.first('slug')"
    )

    input-field(
      v-if="formData.title !== null && formData.title.length >= 0"
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :disabled="isSaving"
      :errorText="errors.first('title')"
    )

    input-field(
      v-if="formData.subtitle !== null && formData.subtitle.length >= 0"
      label="Subtitle"
      name="subtitle"
      placeholder=""
      v-validate="'required'"
      v-model="formData.subtitle"
      :disabled="isSaving"
      :errorText="errors.first('subtitle')"
    )

    input-field(
      v-if="formData.path !== null && formData.slug.length >= 0"
      label="Path"
      name="path"
      placeholder=""
      v-validate="'required'"
      v-model="formData.path"
      :disabled="isSaving"
      :errorText="errors.first('path')"
    )

    markdown-textarea-field(
      v-if="formData.description !== null && formData.description.length >= 0"
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
          mainNavigation: this.data.fields.mainNavigation ? this.data.fields.mainNavigation[lang()] : null,
          slug: this.data.fields.slug ? this.data.fields.slug[lang()] : null,
          title: this.data.fields.title ? this.data.fields.title[lang()] : null,
          subtitle: this.data.fields.subtitle ? this.data.fields.subtitle[lang()] : null,
          path: this.data.fields.path ? this.data.fields.path[lang()] : null,
          description: this.data.fields.description ? this.data.fields.description[lang()] : null
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
