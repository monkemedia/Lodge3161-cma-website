<template lang="pug">
  .columns
    .column.is-10
      .page-main
        header.header
          h1.h1 Pages
        section.page-main__content
          h2.h2 {{ $route.params.query }}
            //- | {{ removeCamelCase($route.params.slug) }} <span class="sub" v-if="!$route.query.isParent && $route.query.entries">: {{ removeCamelCase($route.query.entries) }} </span>
          span.id-subtitle ID: {{ $route.params.id }}
          form
            media-form(
              v-if="mediaData"
              :media-data="mediaData"
              :is-saving="isSaving"
              @isFormDirty="isFormDirtyHandler")
            basic-form(
              v-if="formData"
              :form-data="formData"
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
        const formDataId = this.formData.metadata.id
        const mediaDataFields = this.mediaData.fields
        const mediaDataId = this.mediaData.metadata.id
        let updateFormDataApi
        let createAssetApi
        
        publish ? this.publishIsLoading = true : this.saveIsLoading = true
        this.isSaving = true

        updateFormDataApi = await api.updateData(token, formDataFields, publish, formDataId)

        if (mediaDataFields) {
          createAssetApi = api.createAsset(token, mediaDataFields, publish, mediaDataId)
        }

        Promise.all([updateFormDataApi, createAssetApi])
          .then(res => {
            // this.metadata.version = res.data.metadata.version
            // this.metadata.publishedVersion = res.data.metadata.publishedVersion
            // this.metadata.updatedAt = res.data.metadata.updatedAt
            this.$validator.reset();
            this.isReadyToPublish()
            this.isSaving = false

            if (publish) {
              this.publishIsLoading = false
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';
  @import '../../../../node_modules/sass-rem/rem';

  .h1 {
    margin-bottom: 15px;
  }

  .id-subtitle {
    font-size: rem(11px);
    color: $grey-lighter;
    font-weight: bold;
  }

  .b-tabs {
    margin-top: 30px;
  }

</style>
