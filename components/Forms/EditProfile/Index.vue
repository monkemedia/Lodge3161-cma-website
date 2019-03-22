<template lang="pug">
  form
    error-message(:error-message="errorMessage")

    input-field(
      label="First name"
      name="firstName"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.firstName[lang]"
      :disabled="isSaving"
      :error-text="errors.first('firstName')")

    input-field(
      label="Last Name"
      name="lastName"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.lastName[lang]"
      :disabled="isSaving"
      :error-text="errors.first('lastName')")

    textarea-field(
      label="About"
      name="about"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.about[lang]"
      :disabled="isSaving"
      :error-text="errors.first('about')")

    legend.legend Avatar
    .message
      .message-body
        drop-box(
          :data="formData.media"
          :is-saving="isSaving"
          v-model="formData.media.file[lang]"
          v-validate="'required'"
          name="dropBox"
          @dropbox="updateData")

        input-field(
          label="Alt"
          name="alt"
          placeholder=""
          v-validate="'required'"
          v-model="formData.media.title[lang]"
          :disabled="isSaving"
          :error-text="errors.first('alt')")

    save-buttons(
      :is-form-dirty="isFormDirty"
      :save-is-loading="isSaving"
      :any-form-errors="errors.items.length <= 0"
      @click="updateForm")

</template>

<script>
  import api from '@/api/contentful'
  import { lang } from '@/utils'
  import DropBox from '@/components/Forms/Fields/DropBox'
  import SaveButtons from '@/components/Forms/Buttons/SaveButtons'

  export default {
    components: {
      SaveButtons,
      DropBox
    },

    props: {
      data: {
        type: [Object, String],
        required: false
      }
    },

    data () {
      const user = this.$store.getters['auth/getUser']
      return {
        lang,
        errorMessage: '',
        isSaving: false,
        formData: {
          fields: {
            firstName: {
              [lang]: this.data ? this.data.fields.firstName[lang] : ''
            },
            lastName: {
              [lang]: this.data ? this.data.fields.lastName[lang] : ''
            },
            about: {
              [lang]: this.data ? this.data.fields.about[lang] : ''
            }
          },
          media: {
            title: {
              [lang]: this.data ? this.data.media.title[lang] : ''
            },
            file: {
              [lang]: {
                url: this.data ? this.data.media.file[lang].url : '',
                fileName: this.data ? this.data.media.file[lang].fileName : '',
                contentType: this.data ? this.data.media.file[lang].contentType : ''
              }
            }
          },
          userId: user ? user.userId : ''
        }

      }
    },

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).some(key => this.fields[key].dirty);
      }
    },

    methods: {
      updateForm (publish) {
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
            const publish = false
            const isUpdateAndPublish = true

            this.isSaving = true

            if (!this.data) {
              // Create New Entry
              console.log('create form')
              return api.createProfile(token, formData)
                .then(res => {
                  this.$validator.reset();
                  this.isSaving = false
                  this.$nuxt.$emit('close-modal')
                  this.$toast.open({
                    message: 'Profile has been created',
                    type: 'is-success',
                    duration: 5000,
                    position: 'is-bottom-right',
                    actionText: null
                  })

                  // Redirect user to newly created page
                  window.location.reload(true)
                })
            }

            // Update Entry
            const entryId = this.data.metadata.id

            return api.updateData(token, formData, publish, isUpdateAndPublish, entryId)
          })
          .then(res => {
            this.$validator.reset();
            this.isSaving = false
            this.$nuxt.$emit('close-modal')
            this.$toast.open({
              message: 'Your details have been saved',
              type: 'is-success',
              duration: 5000,
              position: 'is-bottom-right',
              actionText: null
            })
            window.location.reload(true)
          })
          .catch(err => {
            this.errorMessage = err.message ? err.message : err.response.data.error
            setTimeout(() => {
              const element = document.querySelectorAll('.is-error')[0]

              this.isSaving = false

              if (!element) return

              this.$scrollTo(element, {
                container: '.modal-card-body',
              })
            }, 300)
          })
      },

      updateData (imageData) {
        this.formData.image.file[lang].url = imageData.url
        this.formData.image.file[lang].fileName = imageData.fileName
        this.formData.image.file[lang].contentType = imageData.contentType
      }
    }
  }
</script>

<style lang="scss">
</style>
