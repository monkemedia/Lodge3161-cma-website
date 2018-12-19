<template lang="pug">
  form
    input-field(
      label="Slug"
      name="slug"
      placeholder=""
      v-validate="'required'"
      v-model="formData.slug"
      :disabled="isSaving"
      :errorText="errors.first('slug')"
    )

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

    checkbox-field(
      label="Add to navigation"
      name="mainNavigation"
      placeholder=""
      v-validate="'required'"
      v-model="formData.mainNavigation"
      :disabled="isSaving"
    )

    markdown-textarea-field(
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.description"
      :disabled="isSaving"
      :errorText="errors.first('description')"
    )

    .message
      .message-body
        drop-box(
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
          :errorText="errors.first('alt')"
        )

    save-buttons(
      :isFormDirty="isFormDirty"
      :saveIsLoading="saveIsLoading"
      :anyFormErrors="errors.items.length <= 0"
      @click="saveForm"
    )

</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import DropBox from '@/components/Forms/Fields/DropBox'
  import SaveButtons from '@/components/Forms/Buttons/SaveButtons'

  Vue.use(VeeValidate)

  export default {
    components: {
      SaveButtons,
      DropBox
    },

    data () {
      return {
        saveIsLoading: false,
        isSaving: false,
        formData: {
          slug: '',
          title: '',
          subtitle: '',
          mainNavigation: false,
          description: '',
          image: {
            file: '',
            alt: ''
          }
        }
      }
    },

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).some(key => this.fields[key].changed);
      },
    },

    methods: {
      saveForm () {
        console.log('save form');
      },

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
