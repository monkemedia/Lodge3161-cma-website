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
      :error-text="errors.first('slug')"
    )

    input-field(
      v-if="formData.title !== null && formData.title.length >= 0"
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :disabled="isSaving"
      :error-text="errors.first('title')"
    )

    input-field(
      v-if="formData.subtitle !== null && formData.subtitle.length >= 0"
      label="Subtitle"
      name="subtitle"
      placeholder=""
      v-validate="'required'"
      v-model="formData.subtitle"
      :disabled="isSaving"
      :error-text="errors.first('subtitle')"
    )

    input-field(
      v-if="formData.path !== null && formData.path.length >= 0"
      label="Path"
      name="path"
      placeholder=""
      v-validate="'required'"
      v-model="formData.path"
      :disabled="isSaving"
      :error-text="errors.first('path')"
    )

    markdown-textarea-field(
      v-if="formData.description !== null && formData.description.length >= 0"
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.description"
      :disabled="isSaving"
      :error-text="errors.first('description')"
    )

    save-publish-buttons(
      :page-type="formData.pageType"
      :is-publish="isPublish"
      :is-form-dirty="isFormDirty"
      :save-is-loading="saveIsLoading"
      :deleting-is-loading="deletingIsLoading"
      :publish-is-loading="publishIsLoading"
      :any-form-errors="errors.items.length <= 0"
      @click="saveForm"
      @delete-modal="deleteModal"
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
          mainNavigation: this.data && this.data.fields.mainNavigation ? this.data.fields.mainNavigation[lang()] : null,
          slug: this.data && this.data.fields.slug ? this.data.fields.slug[lang()] : null,
          title: this.data && this.data.fields.title ? this.data.fields.title[lang()] : null,
          subtitle: this.data && this.data.fields.subtitle ? this.data.fields.subtitle[lang()] : null,
          path: this.data && this.data.fields.path ? this.data.fields.path[lang()] : null,
          description: this.data && this.data.fields.description ? this.data.fields.description[lang()] : null,
          pageType: this.data && this.data.metadata.type
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
