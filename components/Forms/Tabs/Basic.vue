<template lang="pug">
  div
    checkbox-field(
      v-if="formData.fields.mainNavigation"
      label="Add to navigation"
      name="mainNavigation"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.mainNavigation[lang]"
      :disabled="isSaving"
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
    )
    p.is-hidden {{ isFormDirty }}

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

    mounted () {
      console.log(this)
    },

    computed: {
      isFormDirty () {
        
        return Object.keys(this.fields).some(key => {
          return this.$emit('isFormDirty', this.fields[key].dirty)
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
