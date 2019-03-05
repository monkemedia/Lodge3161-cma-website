<template lang="pug">
  main
    left-menu-pages
    section
      .container.is-fluid
        .columns
          .column
            header.header
              h1.h1 Pages
            section.page-main__content
              h2.h2 {{ $route.params.query }}
                //- | {{ removeCamelCase($route.params.slug) }} <span class="sub" v-if="!$route.query.isParent && $route.query.entries">: {{ removeCamelCase($route.query.entries) }} </span>
              span.id-subtitle ID: {{ $route.params.id }}
              form
                basic-form(
                  v-if="formData"
                  :form-data="formData"
                  :is-saving="isSaving"
                  @isFormDirty="isFormDirtyHandler")
                media-form(
                  v-if="mediaData"
                  :media-data="mediaData"
                  :is-saving="isSaving"
                  @isFormDirty="isFormDirtyHandler")
                button-form(
                  v-if="buttonData"
                  :button-data="buttonData"
                  :is-saving="isSaving"
                  @isFormDirty="isFormDirtyHandler")
                //- p isFormDirty {{ isFormDirty }}
                save-publish-buttons(
                  :is-publish="isPublish"
                  :is-form-dirty="isFormDirty"
                  :save-is-loading="saveIsLoading"
                  :deleting-is-loading="deletingIsLoading"
                  :publish-is-loading="publishIsLoading"
                  :any-form-errors="errors.items.length <= 0"
                  @click="saveForm"
                  @delete-modal="deleteModal"
                ) 

                .last-saved.has-text-right
                  p Last saved {{ lastSaved }}
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  import api from '@/api/contentful'
  import LeftMenuPages from '@/components/Menu/LeftMenuPages'
  import SavePublishButtons from '@/components/Forms/Buttons/SavePublishButtons'
  import BasicForm from '@/components/Forms/Tabs/Basic'
  import MediaForm from '@/components/Forms/Tabs/Media'
  import ButtonForm from '@/components/Forms/Tabs/Button'
  import DeleteModal from '@/components/Modals/Delete'
  import { lang } from '@/utils'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      LeftMenuPages,
      BasicForm,
      MediaForm,
      ButtonForm,
      DeleteModal,
      SavePublishButtons
    },

    data () {
      return {
        isSaving: false,
        isPublishable: false,
        saveIsLoading: false,
        publishIsLoading: false,
        deletingIsLoading: false,
        isFormDirty: false
      }
    },

    async asyncData ({ store, params, query, error }) {
      const token = store.getters['auth/getToken']
      const entryId = params.id

      if (entryId === undefined) { 
        return error({ statusCode: 404, message: 'Sadly this page cannot be found.' })
      }

      try {
        const fetchData = await api.fetchData(token, entryId, false)
        const data = fetchData.data
        let isAsset
        let id
        let fetchImage
        let fetchCta

        if (data.fields.image && data.fields.image[lang].sys.linkType === 'Asset') {
          id = data.fields.image[lang].sys.id
          isAsset = true
          fetchImage = await api.fetchData(token, id, isAsset)
        }

        if (data.fields.button && data.fields.button[lang].sys.linkType === 'Entry') {
          id = data.fields.button[lang].sys.id
          isAsset = false
          fetchCta = await api.fetchData(token, id, isAsset)
        }

        return {
          formData: {
            ...data
          },
          mediaData: {
            ...fetchImage.data
          },
          buttonData: {
            ...fetchCta.data
          }
        }
      } catch (err) {
        return error({ statusCode: 500, message: 'Something went wrong.' })
      }
    },

    mounted() {
      this.isReadyToPublish()
    },

    computed: {
      isHomepage () {
        return this.$route.query['isHomepage']
      },

      lastSaved () {
        return moment(this.formData.metadata.updatedAt).fromNow();
      },

      isPublish () {
        if (this.isPublishable === false) {
          return false
        } else if (this.isPublishable === true) {
          return true
        } 
      }
    },

    methods: {
      async saveForm (publish) {
        const token = this.$store.getters['auth/getToken']
        const formDataFields = this.formData.fields
        const mediaDataFields = this.mediaData.fields
        const buttonDataFields = this.buttonData.fields
        let formDataId 
        let mediaDataId
        let buttonDataId
        let updateFormDataApi
        let createAssetApi
        let updateButtonDataApi
        
        publish ? this.publishIsLoading = true : this.saveIsLoading = true
        this.isSaving = true

        if (formDataFields) {
          formDataId = this.formData.metadata.id
          updateFormDataApi = await api.updateData(token, formDataFields, publish, formDataId)
        }

        if (mediaDataFields) {
          mediaDataId = this.mediaData.metadata.id
          createAssetApi = api.createAsset(token, mediaDataFields, publish, mediaDataId)
        }

        if (buttonDataFields) {
          buttonDataId = this.buttonData.metadata.id
          updateButtonDataApi = await api.updateData(token, buttonDataFields, publish, buttonDataId)
        }

        Promise.all([updateFormDataApi, createAssetApi, updateButtonDataApi])
          .then(res => {
            this.$validator.reset();
            this.isReadyToPublish()
            this.isSaving = false

            if (publish) {
              this.publishIsLoading = false
              this.isPublishable = false

              this.$toast.open({
                message: 'These changes are now live',
                type: 'is-success',
                duration: 5000,
                position: 'is-bottom-right',
                actionText: null
              })

            } else {
              this.saveIsLoading = false
              // Refresh page so updated data shows
              window.location.reload(true)
            }
          })
          .catch(err => {
            console.log(err)
            publish ? this.publishIsLoading = false : this.saveIsLoading = false
            this.isSaving = false
          })
      },

      removeCamelCase (string) {
        return _.startCase(string);
      },

      deleteModal () {
        this.$modal.open({
          parent: this,
          component: DeleteModal,
          hasModalCard: true,
          props: {
            // pageId: this.formData.metadata.id
          }
        })
      },

      isFormDirtyHandler (value) {
        this.isFormDirty = value
      },

      isReadyToPublish () {
        const formDataMetadata = this.formData.metadata
        const mediaDataMetadata = this.mediaData.metadata
        const buttonDataMetadata = this.buttonData.metadata
        const versions = [
          formDataMetadata.version,
          mediaDataMetadata.version,
          buttonDataMetadata.version
        ]
        const publishedVersions = [
          formDataMetadata.publishedVersion,
          mediaDataMetadata.publishedVersion,
          buttonDataMetadata.publishedVersion
        ]

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

<style lang="scss" scoped>
  main {
    display: flex;
  }

  section {
    flex: 1;
  }

  header {
    padding-top: 20px;
  }

</style>
