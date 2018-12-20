<template lang="pug">
  .field
    b-checkbox(
      v-model="checkboxField" 
      :name="name"  
      @input="$emit('input', checkboxField)") 
      span.label {{ label }}
</template>

<script>
  export default {
    $_veeValidate: {
      // value getter
      value () {
        return this.value;
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
        type: Boolean,
        required: true
      }
    },

    data () {
      return {
        checkboxField: this.value
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
