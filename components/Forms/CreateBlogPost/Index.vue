<template lang="pug">
  form
    error-message(:error-message="errorMessage")

    input-field(
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :disabled="isSaving"
      :error-text="errors.first('title')")

    markdown-textarea-field(
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.description"
      :disabled="isSaving"
      :error-text="errors.first('description')")

    legend.legend Page media
    .message
      .message-body
        drop-box(
          :data="formData.media"
          :is-saving="isSaving"
          v-model="formData.media.file[lang]"
          v-validate="'required'"
          name="dropBox")

        input-field(
          label="Alt"
          name="alt"
          placeholder=""
          v-validate="'required'"
          v-model="formData.media.title"
          :disabled="isSaving"
          :error-text="errors.first('alt')")

    save-publish-buttons(
      :is-publish="isPublish"
      :is-form-dirty="isFormDirty"
      :save-is-loading="saveIsLoading"
      :deleting-is-loading="deletingIsLoading"
      :publish-is-loading="publishIsLoading"
      :any-form-errors="errors.items.length <= 0"
      @click="saveForm"
    ) 

    .last-saved.has-text-right
      p Last saved {{ lastSaved }}

</template>

<script>
  import moment from 'moment'
  import { lang } from '@/utils'
  import api from '@/api/blog'
  import DropBox from '@/components/Forms/Fields/DropBox'
  import SavePublishButtons from '@/components/Forms/Buttons/SavePublishButtons'

  export default {
    components: {
      SavePublishButtons,
      DropBox
    },

    props: {
      data: {
        type: Object,
        required: false
      },

      update: {
        type: Boolean,
        required: false
      }
    },

    data () {
      const data = this.data

      return {
        lang,
        errorMessage: '',
        isSaving: false,
        isPublishable: false,
        publishIsLoading: false,
        saveIsLoading: false,
        deletingIsLoading: false,
        formData: {
          title: data ? data.fields.title[lang] : '',
          description: data ? data.fields.description[lang] : '',
          media: {
            title: data ? data.media.fields.title[lang] : '',
            file: {
              [lang]: {
                url: data ? data.media.fields.file[lang].url : '',
                fileName: data ? data.media.fields.file[lang].fileName : '',
                contentType: data ? data.media.fields.file[lang].contentType : ''
              }
            }
          }
        }
      }
    },

    mounted() {
      this.isReadyToPublish()
    },

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).some(key => this.fields[key].changed);
      },

      lastSaved () {
        return moment(this.data.metadata.updatedAt).fromNow();
      },

      isPublish () {
        if (this.isPublishable) {
          return true
        }
        return false
      }
    },

    methods: {
      toast (message) {
        this.$toast.open({
          message,
          type: 'is-success',
          duration: 5000,
          position: 'is-bottom-right',
          actionText: null
        })
      },

      async saveForm (publish) {
        this.$validator.validateAll('title description')
          .then(result => {
            if (!result) {
              setTimeout(() => {
                const element = document.querySelectorAll('.is-error')[0]

                if (!element) return

                this.$scrollTo(element, {
                  container: 'body',
                })
              })
              return 
            }

            const token = this.$store.getters['auth/getToken']
            const formData = this.formData
            const formDataId = this.data.metadata.id
            const isUpdateAndPublish = false
            let updateDataApi
            let createDataApi

            this.isSaving = true
            publish ? this.publishIsLoading = true : this.saveIsLoading = true

            if (this.update) {
              updateDataApi = api.updateData(token, formData, publish, isUpdateAndPublish, formDataId)
            } else {
              createDataApi = api.create(token, formData)
            }

            Promise.all([ updateDataApi, createDataApi ])
              .then(res => {
                this.$validator.reset();
                this.isSaving = false

                if (this.update) {
                  if (publish) {
                    this.publishIsLoading = false
                    this.isPublishable = false
                    this.toast('These changes are now live')
                    setTimeout(() => {
                      window.location.reload(true)
                    }, 800)
                  } else {
                    this.toast('These changes have now been updated')
                    this.saveIsLoading = false
                    setTimeout(() => {
                      window.location.reload(true)
                    }, 800)
                  }
                  
                } else {
                  const data = res[0].data
                  const id = data.id
                  this.saveIsLoading = false
                  // Redirect user to newly created page
                  this.toast('This post has now been created')

                  setTimeout(() => {
                    window.location.href = `/blog/${id}`
                  }, 800)
                }
              })
              .catch(err => {
                this.errorMessage = err.message ? err.message : err.response.data.error
                publish ? this.publishIsLoading = false : this.saveIsLoading = false
                this.saveIsLoading = false
                setTimeout(() => {
                  const element = document.querySelectorAll('.is-error')[0]

                  if (!element) return

                  this.isSaving = false

                  if (!element) return

                  this.$scrollTo(element, {
                    container: 'body',
                  })
                }, 300)
              })
            })
      },

      isReadyToPublish () {
        const formDataMetadata = this.data.metadata
        const mediaDataMetadata = this.data.media.metadata
        const versions = [formDataMetadata.version, mediaDataMetadata.version]
        const publishedVersions = [formDataMetadata.publishedVersion, mediaDataMetadata.publishedVersion]

        const test = versions.filter((version, index) => {
          return version > publishedVersions[index] + 1
        })

        if (test.length > 0) {
          this.isPublishable = true
        } else {
          this.isPublishable = false
        }

      }
    }
  }
</script>

<style lang="scss">
</style>
