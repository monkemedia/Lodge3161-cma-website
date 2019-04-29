<template lang="pug">
  .field
    label.label {{ label }}
      small (Insert commas to seperate the values)
    .control
      //- 188 is key code for comman (,)
      input.input(
        type="text" 
        :disabled="disabled" 
        :placeholder="placeholder" 
        :name="name"
        @keyup.188="createTag"
        v-model="inputField")

    .tags-container
      .field.is-grouped.is-grouped-multiline
        .control(v-for="(tag, index) in tags" v-if="tag !== 'false12345'")
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
        type: Array,
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

    mounted () {
      this.createTag()
    },

    methods: {
      createTag () {
        let inputField = this.inputField

        if (Array.isArray(inputField)) {
          inputField.map(value => {
            this.tags.push(value)
          })
        } else {
          inputField = inputField.replace(/,/g, '')
          this.tags.push(inputField)
        }
        
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
