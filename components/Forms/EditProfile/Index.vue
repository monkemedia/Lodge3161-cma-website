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
          :data="formData"
          :is-saving="isSaving"
          v-model="formData.image.file.url"
          v-validate="'required'"
          name="dropBox"
          @dropbox="updateData")

        input-field(
          label="Alt"
          name="alt"
          placeholder=""
          v-validate="'required'"
          v-model="formData.image.title"
          :disabled="isSaving"
          :error-text="errors.first('alt')")

    save-buttons(
      :is-form-dirty="isFormDirty"
      :save-is-loading="isSaving"
      :any-form-errors="errors.items.length <= 0"
      @click="saveForm")

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
      userData: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        lang: lang(),
        errorMessage: '',
        isSaving: false,
        formData: {
          firstName: this.userData.firstName || '',
          lastName: this.userData.lastName || '',
          about: this.userData.about || '',
          image: {
            file: {
              url: this.userData.image.file[lang()].url || ''
            },
            title: this.userData.image.title[lang()] || ''
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
