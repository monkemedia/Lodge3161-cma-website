<template lang="pug">
  .image
    legend Image
    .message.is-light
      .message-body
        drop-box(
          :data="mediaData.fields"
          :isSaving="isSaving"
          v-model="mediaData.fields.file[lang]"
          v-validate="'required'"
          name="dropBox"
          @dropbox="updateData"
          @input="hasChanged")

        input-field(
          label="Alt"
          name="alt"
          placeholder=""
          v-validate="'required'"
          v-model="mediaData.fields.title[lang]"
          :disabled="isSaving"
          :error-text="errors.first('alt')"
          @input="hasChanged")

</template>

<script>
  // import mixin from '@/plugins/mixins/common-api-functionality'
  import { lang } from '@/utils/index'
  import DropBox from '@/components/Forms/Fields/DropBox'

  export default {
    // mixins: [mixin],
    props: {
      mediaData: {
        type: Object,
        required: true
      },

      isSaving: {
        type: Boolean,
        required: true
      }
    },

    data () {
      return {
        lang
      }
    },

    components: {
      DropBox
    },

    methods: {
      updateData (data) {
        // console.log(data)
        this.mediaData.fields.file[lang].url = data.url
        this.mediaData.fields.file[lang].fileName = data.fileName
        this.mediaData.fields.file[lang].contentType = data.contentType
      },

      hasChanged () {
        this.$emit('isFormDirty', true)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/mixins.scss';

  .image {
    margin-bottom: 30px;
  }

  legend {
    margin-bottom: 15px;
    @include Bold();
  }

</style>
