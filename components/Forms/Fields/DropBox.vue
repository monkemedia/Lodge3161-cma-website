<template lang="pug">
  .dropbox(@click="launchFilePicker()" :class="{ 'disabled' : isSaving }")
      .dropbox__inner
        figure(v-if="data.image.file.url")
          img(:src="data.image.file.url")
        .text-container(v-if="!data.image.file.url")
          span.icon
            .fa-stack
              i.far.fa-circle.fa-stack-2x
              i.fas.fa-cloud-upload-alt
          p Upload image
        input(
          hidden="true"
          ref="file"
          type="file" 
          name="file"
          :disabled="isSaving"
          @change="onFileChange($event.target.name, $event.target.files[0])" 
          accept="image/*")
        a.dropbox__upload-hover(v-if="data.image.file.url")
          span.icon
            .fa-stack
              i.fas.fa-cloud-upload-alt.dropbox__upload-hover__icon
              i.fas.fa-circle.fa-stack-2x.dropbox__upload-hover__background
</template>

<script>
  export default {
    $_veeValidate: {
      value () {
        return  this.value;
      },
      name () {
        return this.name;
      }
    },

    props: {
      data: {
        type: Object,
        required: true
      },

      isSaving: {
        type: Boolean,
        required: true
      }
    },

    methods: {
      launchFilePicker (){
        this.$refs.file.click();
      },

      onFileChange (fieldName, file) {
        let imageFile = file
        const reader  = new FileReader()

        reader.onload = (e) => {
          this.$emit('input', {
            url: e.target.result,
            fileName: imageFile.name,
            contentType: imageFile.type
          })
        }
        reader.readAsDataURL(imageFile)
        this.imageUpdated = true
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../node_modules/sass-rem/rem';
  @import '~assets/css/utilities/variables.scss';

  .dropbox {
    margin-bottom: 20px;

    &.disabled {
      pointer-events: none;
    }

    &__inner {
      cursor: pointer;
      background: $white;
      width: 100%;
      display: block;
      height: 300px;
      border: dashed 2px $grey-200;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      display: flex;
      position: relative;

      .text-container {
        text-align: center;

        .icon {
          width: 40px;
          height: 40px;

          .fa-stack {
            justify-content: center;
            align-items: center;
            display: flex;
          }
        }

        p {
          font-size: $size-120;
        }
      }

      &:hover {
        .text-container {
          color: $grey-300;
        }
      }
    }

    &__upload-hover {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -20px;
      margin-left: -20px;
      display: none;

     .icon {
        width: 40px;
        height: 40px;

        .fa-stack {
          justify-content: center;
          align-items: center;
          display: flex;
        }

        .dropbox__upload-hover__icon {
          z-index: 1;

          &:before {
            color: $grey-light;
          }
        }

        .dropbox__upload-hover__background {
          color: $white;
        }
      }

      &:hover {
        .dropbox__upload-hover__icon {
          &:before {
            color: $white;
          }
        }

        .dropbox__upload-hover__background {
          color: $grey-light;
        }
      }
    }

    &:hover {
      .dropbox__upload-hover {
        display: block;
      }
    }
  }
</style>
