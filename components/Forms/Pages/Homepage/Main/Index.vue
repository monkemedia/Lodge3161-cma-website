<template lang="pug">
  form
    input-field(
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :errorText="errors.first('title')"
    )
    textarea-field(
      label="Description"
      name="description"
      placeholder=""
      v-validate="'required'"
      v-model="formData.description"
      :errorText="errors.first('description')"
    )

    .field.is-grouped.is-grouped-right
      .control
          button.button.is-light(:disabled="!isFormDirty" @click.prevent="saveForm(false)") Save
          button.button.is-primary(v-if="!isPublish" :disabled="!isPublish" @click.prevent="saveForm(true)") Publish
          button.button.is-primary(v-if="isPublish && !isFormDirty" :disabled="!isPublish" @click.prevent="saveForm(true)") Publish
          button.button.is-primary(v-if="isPublish && isFormDirty" :disabled="isPublish" @click.prevent="saveForm(true)") Publish
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import api from '@/api'

  Vue.use(VeeValidate)

  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        formData: {
          title: this.data.fields.title,
          description: this.data.fields.description
        },
        metadata: {
          version: this.data.metadata.version,
          publishedVersion: this.data.metadata.publishedVersion
        },
        isPublishable: false
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

        api.homepage.updateMainData(token, formData, publish)
          .then(res => {
            console.log('res', res.data);
            this.metadata.version = res.data.metadata.version
            this.metadata.publishedVersion = res.data.metadata.publishedVersion
            this.$validator.reset();
            this.isReadyToPublish()
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';

</style>
