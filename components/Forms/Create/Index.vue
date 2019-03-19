<template lang="pug">
  form
    error-message(:error-message="errorMessage")

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
      label="Blurb"
      name="blurb"
      placeholder=""
      v-validate="'required'"
      v-model="formData.blurb"
      :disabled="isSaving"
      :error-text="errors.first('blurb')")

    checkbox-field(
      label="Add to navigation"
      name="navigation"
      placeholder=""
      v-validate="'required'"
      v-model="formData.navigation"
      :disabled="isSaving")

    markdown-textarea-field(
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.description"
      :disabled="isSaving"
      :error-text="errors.first('description')")

    legend.legend Hero
    .message
      .message-body
        input-field(
          label="Title"
          name="title"
          placeholder=""
          v-validate="'required'"
          v-model="formData.hero.title"
          :disabled="isSaving"
          :error-text="errors.first('title')")

        drop-box(
          :data="formData.hero"
          :is-saving="isSaving"
          v-model="formData.hero.image.file"
          v-validate="'required'"
          name="dropBox"
          @dropbox="updateData")

        input-field(
          label="Alt"
          name="alt"
          placeholder=""
          v-validate="'required'"
          v-model="formData.hero.image.alt"
          :disabled="isSaving"
          :error-text="errors.first('alt')")

        legend.legend Button
        .message
          .message-body
            input-field(
              label="Title"
              name="title"
              placeholder=""
              v-validate="'required'"
              v-model="formData.hero.cta.title"
              :disabled="isSaving"
              :error-text="errors.first('title')")

            input-field(
              label="Path"
              name="path"
              placeholder=""
              v-validate="'required'"
              v-model="formData.hero.cta.path"
              :disabled="isSaving"
              :error-text="errors.first('path')")

    legend.legend Page Settings
    .message
      .message-body
        input-field(
          label="Title"
          name="title"
          placeholder=""
          v-validate="'required'"
          v-model="formData.pageMeta.title"
          :disabled="isSaving"
          :error-text="errors.first('title')")

        textarea-field(
          label="Description"
          name="description"
          placeholder=""
          v-validate="'required'"
          v-model="formData.pageMeta.description"
          :disabled="isSaving"
          :error-text="errors.first('description')")

    save-buttons(
      :is-form-dirty="isFormDirty"
      :save-is-loading="isSaving"
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
        isSaving: false,
        formData: {
          slug: '',
          title: '',
          blurb: '',
          navigation: false,
          description: '',
          hero: {
            title: '',
            image: {
              file: '',
              alt: ''
            },
            cta: {
              title: '',
              path: ''
            }
          },
          pageMeta: {
            title: '',
            description: ''
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
                const data = res.data.data
                const slug = data.title
                const id = data.id

                this.$validator.reset();
                this.isSaving = false
                this.$nuxt.$emit('close-modal')
                this.$toast.open({
                  message: 'Page has been created',
                  type: 'is-success',
                  duration: 5000,
                  position: 'is-bottom-right',
                  actionText: null
                })

                // Redirect user to newly created page
                window.location.href = `/${slug}/${id}?parent=${slug}&isHomepage=false&isParent=true`
              })
              .catch(err => {
                this.errorMessage = err.message ? err.message : err.response.data.error
                setTimeout(() => {
                  const element = document.querySelectorAll('.is-error')[0]

                  this.isLoading = false

                  if (!element) return

                  this.$scrollTo(element, {
                    container: '.modal-card-body',
                  })
                }, 300)
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
