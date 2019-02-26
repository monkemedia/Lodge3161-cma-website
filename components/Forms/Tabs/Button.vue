<template lang="pug">
  div
    input-field(
      v-if="buttonData.fields.title[lang]"
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="buttonData.fields.title[lang]"
      :disabled="isSaving"
      :error-text="errors.first('title')"
    )
    input-field(
      v-if="buttonData.fields.path[lang]"
      label="Path"
      name="path"
      placeholder=""
      v-validate="'required'"
      v-model="buttonData.fields.path[lang]"
      :disabled="isSaving"
      :error-text="errors.first('path')"
    )

    p.is-hidden {{ isFormDirty }}
</template>

<script>
  import { lang } from '@/utils'

  export default {
    props: {
      buttonData: {
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

    mounted () {
      console.log(this)
    },

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).some(key => {
          if (!this.fields[key].dirty) return false
          return this.$emit('isFormDirty', this.fields[key].dirty)
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
