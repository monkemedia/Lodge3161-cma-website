<template lang="pug">
  .basic
    checkbox-field(
      v-if="formData.fields.mainNavigation"
      label="Add to navigation"
      name="mainNavigation"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.mainNavigation[lang]"
      :disabled="isSaving"
      @input="hasChanged"
    )

    input-field(
      v-if="formData.fields.slug"
      label="Slug"
      name="slug"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.slug[lang]"
      :disabled="isSaving"
      :error-text="errors.first('slug')"
      @input="hasChanged"
    )

    input-field(
      v-if="formData.fields.title"
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.title[lang]"
      :disabled="isSaving"
      :error-text="errors.first('title')"
      @input="hasChanged"
    )

    input-field(
      v-if="formData.fields.blurb"
      label="Blurb"
      name="blurb"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.blurb[lang]"
      :disabled="isSaving"
      :error-text="errors.first('blurb')"
      @input="hasChanged"
    )

    input-field(
      v-if="formData.fields.path"
      label="Path"
      name="path"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.path[lang]"
      :disabled="isSaving"
      :error-text="errors.first('path')"
      @input="hasChanged"
    )

    markdown-textarea-field(
      v-if="formData.fields.description"
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.description[lang]"
      :disabled="isSaving"
      :error-text="errors.first('description')"
      @input="hasChanged"
    )

    markdown-textarea-field(
      v-if="formData.fields.address"
      label="Address"
      name="address"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.address[lang]"
      :disabled="isSaving"
      :error-text="errors.first('address')"
      @input="hasChanged"
    )

</template>

<script>
  import { lang } from '@/utils'
  import SavePublishButtons from '@/components/Forms/Buttons/SavePublishButtons'

  export default {
    props: {
      formData: {
        type: Object,
        required: true
      },

      isSaving: {
        type: Boolean,
        required: true
      }
    },

    components: {
      SavePublishButtons
    },

    data () {
      return {
        lang
      }
    },

    methods: {
      hasChanged (value, content) {
        if (content && value.length !== content.length) {
          return this.$emit('isFormDirty', true)
        } else if (!content && value) {
          this.$emit('isFormDirty', true)
        }        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .basic {
    margin-bottom: 30px;
  }
</style>
