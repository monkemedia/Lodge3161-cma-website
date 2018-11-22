<template lang="pug">
  .field
    label.labelName.has-text-weight-bold {{ label }}
    .control
      input.input(type="text" :placeholder="placeholder" :name="name" @input="$emit('input', $event.target.value)" v-model="inputField")
      p(v-show="errors.items[0] && errors.items[0].msg" class="help is-danger") {{ errors.items[0] && errors.items[0].msg }}
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
      }
    },

    data () {
      return {
        inputField: this.value
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
