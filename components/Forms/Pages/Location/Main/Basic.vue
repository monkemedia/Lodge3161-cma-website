<template lang="pug">
  form
    markdown-textarea-field(
      label="Address"
      name="address"
      placeholder=""
      v-validate="'required'"
      v-model="formData.address"
      :disabled="isSaving"
      :errorText="errors.first('address')"
    )

    .notification
      .field.is-horizontal
        .field-body
          input-field(
            label="Longitude"
            name="longitude"
            placeholder=""
            v-validate="'required'"
            v-model="formData.location.lon"
            :disabled="isSaving"
            :errorText="errors.first('longitude')"
          )
          input-field(
            label="Latitude"
            name="latitude"
            placeholder=""
            v-validate="'required'"
            v-model="formData.location.lat"
            :disabled="isSaving"
            :errorText="errors.first('latitude')"
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
  import { lang } from '@/utils'

  Vue.use(VeeValidate)

  export default {
    mixins: [mixin],

    data () {
      return {
        formData: {
          address: this.data.fields.address[lang()],
          location: {
            lat: this.data.fields.location[lang()].lat,
            lon: this.data.fields.location[lang()].lon
          }
        }
      }
    }
  }
</script>

<style lang="scss">
   @import '~assets/css/utilities/variables.scss';

  .notification {
    background: $grey-200;

    .field {
      margin-bottom: 0;
    }
  }

  .textarea {
    height: 150px;
  }
</style>
