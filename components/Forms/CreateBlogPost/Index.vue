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

    tags-input-field(
      label="Tags"
      name="tags"
      placeholder=""
      v-model="formData.tags"
      :disabled="isSaving")

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
          v-model="formData.media.file"
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
      p(v-if="lastSaved") Last saved {{ lastSaved }}

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
              url: data ? data.media.fields.file[lang].url : '',
              fileName: data ? data.media.fields.file[lang].fileName : '',
              contentType: data ? data.media.fields.file[lang].contentType : ''
            }
          },
          tags: []
        }
      }
    },

    mounted() {
      this.isReadyToPublish()
    },

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).some(key => this.fields[key].changed)
      },

      lastSaved () {
        return this.data && this.data.metadata ? moment(this.data.metadata.updatedAt).fromNow() : ''
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
        this.$validator.validateAll()
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
            const userId = this.$store.getters['auth/getUser'].userId
            const formData = this.formData
            const formDataId = this.data ? this.data.metadata.id : ''
            const assetDataId = this.data ? this.data.media.metadata.id : ''
            const isUpdateAndPublish = false
            let updateDataApi
            let createDataApi
            let updateAssetApi

            formData.author = userId// Add author to created post

            this.isSaving = true
            publish ? this.publishIsLoading = true : this.saveIsLoading = true

            if (this.update) {
              if (publish) {
                updateDataApi = api.updateData(token, formData, publish, isUpdateAndPublish, formDataId)
              } else {
                updateDataApi = api.updateData(token, formData, publish, isUpdateAndPublish, formDataId)
                updateAssetApi = api.createAsset(token, formData.media, publish, isUpdateAndPublish, assetDataId)
              }
            } else {
              createDataApi = api.create(token, formData)
            }

            Promise.all([ updateDataApi, createDataApi, updateAssetApi ])
              .then(res => {
                this.$validator.reset();
                this.isSaving = false

                // Update ONLY
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
                  // New POST created
                  res.map(r => {
                    if (r) {
                      const data = r.data
                      const id = data.data.id
                      this.saveIsLoading = false
                      // Redirect user to newly created page
                      this.toast('This post has now been created')

                      setTimeout(() => {
                        window.location.href = `/blog/posts/${id}`
                      }, 800)

                    }
                  })
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
        const formDataMetadata = this.data ? this.data.metadata : ''
        const version = formDataMetadata.version
        const publishedVersion = formDataMetadata.publishedVersion || -1

        if (version > publishedVersion + 1) {
          this.isPublishable = true
          // Is draft
          this.$emit('status', false)
        } else {
          this.isPublishable = false
          // Is live
          this.$emit('status', true)
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
