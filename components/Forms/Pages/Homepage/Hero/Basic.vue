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
      :anyFormErrors="errors.items.length <= 0"
      @click="saveForm"
    )

    .last-saved.has-text-right
      p Last saved {{ lastSaved }}
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import mixin from '@/plugins/mixins/common-api-functionality.js'
  import api from '@/api/contentful'

  Vue.use(VeeValidate)

  export default {
    mixins: [mixin],

    data () {
      return {
        formData: {
          title: this.data.fields.title,
          subtitle: this.data.fields.subtitle,
        }
      }
    },

    methods: {
      saveForm (publish) {
        const token = this.$store.getters['auth/getToken']
        const formData = this.formData
        const urlBasic = '/fetch/basic'
        const entryIdBasic = '3qDt3aaDQQMqAu8yg6C4gq'

        this.$validator.validateAll()
          .then(() => {
            publish ? this.publishIsLoading = true : this.saveIsLoading = true
            this.isSaving = true

            api.updateData(token, formData, publish, urlBasic, entryIdBasic)
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
