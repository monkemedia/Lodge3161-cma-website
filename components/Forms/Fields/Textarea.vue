<template lang="pug">
  .field
    label.label {{ label }}
    .control
      textarea.textarea(type="textarea" :disabled="disabled" :placeholder="placeholder" :name="name" @input="$emit('input', $event.target.value)" v-model="textareaField")
      p(v-show="errorText" class="help is-danger" v-html="errorText")
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
        textareaField: this.value
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
