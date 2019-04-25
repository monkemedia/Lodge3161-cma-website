<template lang="pug">
  .field(:class="{ 'is-error': !!errorText }")
    label.label {{ label }}
    .control
      input.input(
        type="text" 
        :disabled="disabled" 
        :placeholder="placeholder" 
        :name="name"
        @keyup.enter="createTag"
        v-model="inputField")
    .tags-container
      .field.is-grouped.is-grouped-multiline
        .control(v-for="(tag, index) in tags")
          .tags.has-addons
            a.tag.is-primary {{ tag }}
            a.tag.is-delete(@click.prevent="deleteTag(index)")
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
      },

      disabled: {
        type: Boolean,
        required: true
      }
    },

    data () {
      return {
        inputField: this.value,
        tags: []
      }
    },

    methods: {
      createTag () {
        this.tags.push(this.inputField)
        this.inputField = ''
        this.$emit('input', this.tags)
      },

      deleteTag (index) {
        this.tags.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tags-container {
    padding-top: 10px;
  }
</style>
