<template lang="pug">
  .field
    label.label {{ label }}
    .control
      no-ssr
        markdown-editor.editor(
          v-model="content"
          :configs="configs"
          ref="editor"
          @input="$emit('input', content, value )" 
          :disabled="disabled"
          :name="name")
      p(v-show="errorText" 
        class="help is-danger" 
        v-html="errorText")
</template>

<script>
  export default {
    $_veeValidate: {
      // value getter
      value () {
        return this.$el.value;
      },
      // name getter
      name () {
        return this.name;
      }
    },

    props: {
      label: {
        type: String,
        required: true
      },

      name: {
        type: String,
        required: true
      },

      value: {
        type: String,
        required: true
      },

      placeholder: {
        type: String,
        required: false
      },

      errorText: {
        type: String,
        required: false
      },

      disabled: {
        type: Boolean,
        required: true
      }
    },

    data () {
      return {
        content: this.value,
        configs: {
          status: false,
          spellChecker: false,
          hideIcons: [
            'image'
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../node_modules/sass-rem/rem';

  .editor {
    font-size: rem(13px);
  }
</style>
