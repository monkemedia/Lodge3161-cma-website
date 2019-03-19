<template lang="pug">
  form
    error-message(:error-message="errorMessage")

    input-field(
      label="First name"
      name="firstName"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.firstName"
      :disabled="isSaving"
      :error-text="errors.first('firstName')")

    input-field(
      label="Last Name"
      name="lastName"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.lastName"
      :disabled="isSaving"
      :error-text="errors.first('lastName')")

    textarea-field(
      label="About"
      name="about"
      placeholder=""
      v-validate="'required'"
      v-model="formData.fields.about"
      :disabled="isSaving"
      :error-text="errors.first('about')")

    legend.legend Avatar
    .message
      .message-body
        drop-box(
          :data="data.media"
          :is-saving="isSaving"
          v-model="formData.media.file.url"
          v-validate="'required'"
          name="dropBox"
          @dropbox="updateData")

        input-field(
          label="Alt"
          name="alt"
          placeholder=""
          v-validate="'required'"
          v-model="formData.media.title"
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
        type: Object,
        required: true
      }
    },

    data () {
      return {
        lang,
        errorMessage: '',
        isSaving: false,
        formData: {
          fields: {
            firstName: this.data.fields.firstName[lang] || '',
            lastName: this.data.fields.lastName[lang] || '',
            about: this.data.fields.about[lang] || '',
          },
          // image: this.data.fields.image,
          media: {
            file: {
              url: this.data.media.file[lang].url || ''
            },
            title: this.data.media.title[lang] || ''
          }
        }

      }
    },

    mounted () {
      console.log(this)
    },

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).some(key => this.fields[key].dirty);
      },
    },

    methods: {
      updateForm (publish) {
        console.log('this.$validator', this.$validator)
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
            const entryId = this.data.metadata.id

            this.isSaving = true
              
            api.updateData(token, formData, publish, isUpdateAndPublish, entryId)
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
