<template lang="pug">
  div
    drop-box(
      :data="mediaData.fields"
      :isSaving="isSaving"
      v-model="mediaData.fields.file[lang]"
      v-validate="'required'"
      name="dropBox"
      @dropbox="updateData")

    input-field(
      label="Alt"
      name="alt"
      placeholder=""
      v-validate="'required'"
      v-model="mediaData.fields.title[lang]"
      :disabled="isSaving"
      :error-text="errors.first('alt')"
    )

    p.is-hidden {{ isFormDirty }}
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

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).forEach(key => {
          if (!this.fields[key].dirty) return
          return this.$emit('isFormDirty', this.fields[key].dirty)
        })
      }
    },

    methods: {
      updateData (data) {
        // console.log(data)
        this.mediaData.fields.file[lang].url = data.url
        this.mediaData.fields.file[lang].fileName = data.fileName
        this.mediaData.fields.file[lang].contentType = data.contentType
      }
    }
  }
</script>

<style lang="scss">

</style>
