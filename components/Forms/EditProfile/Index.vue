<template lang="pug">
  form
    error-message(:error-message="errorMessage")

    input-field(
      label="First name"
      name="firstName"
      placeholder=""
      v-validate="'required'"
      v-model="formData.firstName"
      :disabled="isSaving"
      :error-text="errors.first('firstName')")

    input-field(
      label="Last Name"
      name="lastName"
      placeholder=""
      v-validate="'required'"
      v-model="formData.lastName"
      :disabled="isSaving"
      :error-text="errors.first('lastName')")

    textarea-field(
      label="About"
      name="about"
      placeholder=""
      v-validate="'required'"
      v-model="formData.about"
      :disabled="isSaving"
      :error-text="errors.first('about')")

    legend.legend Avatar
    .message
      .message-body
        drop-box(
          :data="formData.media"
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
  // import mixin from '@/plugins/mixins/common-api-functionality'

  export default {
    // mixins: [mixin],

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
          firstName: this.data.fields.firstName[lang] || '',
          lastName: this.data.fields.lastName[lang] || '',
          about: this.data.fields.about[lang] || '',
          image: this.data.fields.image,
          media: {
            file: {
              url: this.data.media.file[lang].url || ''
            },
            title: this.data.media.title[lang] || ''
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
            const entryId = this.data.metadata.id

            this.isSaving = true
              
            api.updateData(token, formData, publish, entryId)
              .then(res => {
                this.$validator.reset();
                this.isSaving = false
                this.$nuxt.$emit('close-modal')
                this.$toast.open({
                  message: 'Page has been updated',
                  type: 'is-success',
                  duration: 5000,
                  position: 'is-bottom-right',
                  actionText: null
                })
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
