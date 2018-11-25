<template lang="pug">
  form
    input-field(
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :disabled="isSaving"
      :errorText="errors.first('title')"
    )
    input-field(
      label="Subtitle"
      name="subtitle"
      placeholder=""
      v-validate="'required'"
      v-model="formData.subtitle"
      :disabled="isSaving"
      :errorText="errors.first('subtitle')"
    )

    save-publish-buttons(
      :isPublish="isPublish"
      :isFormDirty="isFormDirty"
      :saveIsLoading="saveIsLoading"
      :publishIsLoading="publishIsLoading"
      @click="saveForm"
    )

    .last-saved.has-text-right
      p Last saved {{ lastSaved }}
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import api from '@/api/homepage/hero/basic'
  import moment from 'moment'
  import SavePublishButtons from '@/components/Forms/Buttons/SavePublishButtons'

  Vue.use(VeeValidate)

  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },

    components: {
      SavePublishButtons
    },

    data () {
      return {
        formData: {
          title: this.data.fields.title,
          subtitle: this.data.fields.subtitle,
        },
        metadata: {
          version: this.data.metadata.version,
          publishedVersion: this.data.metadata.publishedVersion,
          updatedAt: this.data.metadata.updatedAt
        },
        isPublishable: false,
        saveIsLoading: false,
        publishIsLoading: false,
        isSaving: false
      }
    },

    mounted() {
      this.isReadyToPublish()
    },

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).some(key => this.fields[key].dirty);
      },

      isPublish () {
        if (this.isPublishable === false) {
          return false
        } else if (this.isPublishable === true) {
          return true
        } 
      },

      lastSaved () {
        return moment(this.metadata.updatedAt).fromNow();
      }
    },

    methods: {
      isReadyToPublish () {
        const version = this.metadata.version
        const publishedVersion = this.metadata.publishedVersion

        if (version > publishedVersion + 1)  {
          this.isPublishable = true
        } else {
          this.isPublishable = false
        }
      },

      saveForm (publish) {
        const token = this.$store.getters['auth/getToken']
        const formData = this.formData

        publish ? this.publishIsLoading = true : this.saveIsLoading = true
        this.isSaving = true

        api.updateData(token, formData, publish)
          .then(res => {
            this.metadata.version = res.data.metadata.version
            this.metadata.publishedVersion = res.data.metadata.publishedVersion
            this.metadata.updatedAt = res.data.metadata.updatedAt
            this.$validator.reset();
            this.isReadyToPublish()
            this.isSaving = false
            publish ? this.publishIsLoading = false : this.saveIsLoading = false
          })
          .catch(err => {
            console.log('something went wrong :( ', err);
            this.isSaving = false
            publish ? this.publishIsLoading = false : this.saveIsLoading = false
          })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../../../node_modules/sass-rem/rem';
  @import '~assets/css/utilities/variables.scss';

  .last-saved p {
    font-size: rem(12px);
  }
</style>
