<template lang="pug">
  .field
    label.labelName.has-text-weight-bold {{ label }}
    .control
      textarea.textarea(type="textarea" :placeholder="placeholder" :value="value")
</template>

<script>
  export default {
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
