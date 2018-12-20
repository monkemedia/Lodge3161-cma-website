<template lang="pug">
  form
    error-message(
      :error-message="errorMessage")

    input-field(
      label="Slug"
      name="slug"
      placeholder=""
      v-validate="'required'"
      v-model="formData.slug"
      :disabled="isSaving"
      :error-text="errors.first('slug')")

    input-field(
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :disabled="isSaving"
      :error-text="errors.first('title')")

    input-field(
      label="Subtitle"
      name="subtitle"
      placeholder=""
      v-validate="'required'"
      v-model="formData.subtitle"
      :disabled="isSaving"
      :error-text="errors.first('subtitle')")

    checkbox-field(
      label="Add to navigation"
      name="mainNavigation"
      placeholder=""
      v-validate="'required'"
      v-model="formData.mainNavigation"
      :disabled="isSaving")

    markdown-textarea-field(
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.description"
      :disabled="isSaving"
      :error-text="errors.first('description')")

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
          :error-text="errors.first('alt')")

    save-buttons(
      :is-form-dirty="isFormDirty"
      :save-is-loading="saveIsLoading"
      :any-form-errors="errors.items.length <= 0"
      @click="saveForm")

</template>

<script>
  import api from '@/api/contentful'
  import DropBox from '@/components/Forms/Fields/DropBox'
  import SaveButtons from '@/components/Forms/Buttons/SaveButtons'

  export default {
    components: {
      SaveButtons,
      DropBox
    },

    data () {
      return {
        errorMessage: '',
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
      saveForm (publish) {
        this.$validator.validateAll()
          .then(result => {
            if (!result) {
              setTimeout(() => {
                const element = document.querySelectorAll('.is-error')[0]

                this.$scrollTo(element, {
                  container: '.modal-card-body',
                })
              })
              return 
            }

            const token = this.$store.getters['auth/getToken']
            const formData = this.formData

            this.isSaving = true
              
            api.create(token, formData)
              .then(res => {
                this.$validator.reset();
                this.isSaving = false
              })
              .catch(err => {
                this.errorMessage = err.message ? err.message : err.response.data.error
                setTimeout(() => {
                  const element = document.querySelectorAll('.is-error')[0]

                  this.$scrollTo(element, {
                    container: '.modal-card-body',
                  })
                }, 300)
                
                this.isLoading = false
              })
            })
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
