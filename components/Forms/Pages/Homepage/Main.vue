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
    textarea-field(
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.description"
      :disabled="isSaving"
      :errorText="errors.first('description')"
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
  import mixin from '@/plugins/mixins/common-api-functionality'
  import api from '@/api/contentful'
  import { lang } from '@/utils'

  Vue.use(VeeValidate)

  export default {
    mixins: [mixin],

    data () {
      return {
        formData: {
          title: this.data.fields.title[lang()],
          description: this.data.fields.description[lang()]
        }
      }
    },

    methods: {
      saveForm (publish) {
        const token = this.$store.getters['auth/getToken']
        const formData = this.formData
        const entryIdMain = '7tT62M3wjYWqGMqOyAEoC2'

        publish ? this.publishIsLoading = true : this.saveIsLoading = true
        this.isSaving = true

        api.updateData(token, formData, publish, entryIdMain)
          .then(res => {
            this.metadata.version = res.data.metadata.version
            this.metadata.publishedVersion = res.data.metadata.publishedVersion
            this.metadata.updatedAt = res.data.metadata.updatedAt
            this.$validator.reset();
            this.isReadyToPublish()
            publish ? this.publishIsLoading = false : this.saveIsLoading = false
            this.isSaving = false
          })
          .catch(err => {
            console.log(err.response.data.error)
            publish ? this.publishIsLoading = false : this.saveIsLoading = false
            this.isSaving = false
          })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../../node_modules/sass-rem/rem';

  .last-saved p {
    font-size: rem(12px);
  }
</style>
