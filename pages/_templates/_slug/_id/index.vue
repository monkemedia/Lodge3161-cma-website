<template lang="pug">
  main.main
    left-menu-pages
    section.section
      .container.is-fluid
        .columns
          .column
            header.header
              h1.h1(v-if="formData.metadata.type === 'pageMeta'") Page Settings
              h1.h1(v-else) {{ removeCamelCase(formData.metadata.type) }}
              span.id-subtitle ID: {{ $route.params.id }}
            section
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
        let mediaData
        let buttonData

        if (data.fields.image && data.fields.image[lang].sys.linkType === 'Asset') {
          id = data.fields.image[lang].sys.id
          isAsset = true
          fetchImage = await api.fetchData(token, id, isAsset)
          mediaData = { ...fetchImage.data }
        }

        if (data.fields.button && data.fields.button[lang].sys.linkType === 'Entry') {
          id = data.fields.button[lang].sys.id
          isAsset = false
          fetchCta = await api.fetchData(token, id, isAsset)
          buttonData = { ...fetchCta.data }
        }

        return {
          formData: {
            ...data
          },
          mediaData,
          buttonData
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
        const formData = this.formData
        const mediaData = this.mediaData.fields
        const buttonData = this.buttonData
        const isUpdateAndPublish = false
        let formDataId 
        let mediaDataId
        let buttonDataId
        let updateFormDataApi
        let createAssetApi
        let updateButtonDataApi
        
        publish ? this.publishIsLoading = true : this.saveIsLoading = true
        this.isSaving = true

        if (formData) {
          formDataId = this.formData.metadata.id
          updateFormDataApi = await api.updateData(token, formData, publish, isUpdateAndPublish, formDataId)
        }

        if (mediaData) {
          mediaDataId = this.mediaData.metadata.id
          createAssetApi = api.createAsset(token, mediaData, publish, isUpdateAndPublish, mediaDataId)
        }

        if (buttonData) {
          buttonDataId = this.buttonData.metadata.id
          updateButtonDataApi = await api.updateData(token, buttonData, publish, isUpdateAndPublish, buttonDataId)
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
            this.saveIsLoading = false
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
        const formDataMetadata = this.formData ? this.formData.metadata : null
        const mediaDataMetadata = this.mediaData ? this.mediaData.metadata : null
        const buttonDataMetadata = this.buttonData ? this.buttonData.metadata : null
        const formDataMetadataVersion = formDataMetadata ? formDataMetadata.version : null
        const mediaDataMetadataVersion = mediaDataMetadata ? mediaDataMetadata.version : null
        const buttonDataMetadataVersion = buttonDataMetadata ? buttonDataMetadata.version : null
        const formDataMetadataPublishedVersion = formDataMetadata ? formDataMetadata.publishedVersion : null
        const mediaDataMetadataPublishedVersion = mediaDataMetadata ? mediaDataMetadata.publishedVersion : null
        const buttonDataMetadataPublishedVersion = buttonDataMetadata ? buttonDataMetadata.publishedVersion : null
        const versions = [
          formDataMetadataVersion,
          mediaDataMetadataVersion,
          buttonDataMetadataVersion
        ]
        const publishedVersions = [
          formDataMetadataPublishedVersion,
          mediaDataMetadataPublishedVersion,
          buttonDataMetadataPublishedVersion
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
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

  .id-subtitle {
    font-size: rem(11px);
    text-transform: uppercase;
    @include Bold();
    color: #cacaca;
  }

</style>
