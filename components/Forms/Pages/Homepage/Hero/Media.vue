<template lang="pug">
  form
    .dropbox
      .dropbox__inner
        .text-container
          span.icon
            .fa-stack
              i.far.fa-circle.fa-stack-2x
              i.fas.fa-cloud-upload-alt
          p Upload image
        input(
          hidden="true"
          type="file" 
          :name="uploadFieldName" 
          :disabled="isSaving" 
          @change="filesChange($event.target.name, $event.target.files)" 
          accept="image/*")
        <p v-if="isInitial">
          Drag your file(s) here to begin<br> or click to browse
        </p>
        <p v-if="isSaving">
          Uploading {{ fileCount }} files...
        </p>
    </div>

    .last-saved.has-text-right
      p Last saved {{ lastSaved }}
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import mixin from '@/plugins/mixins/common-api-functionality.js'

  Vue.use(VeeValidate)

  export default {
    mixins: [mixin],

    data () {
      return {
        formData: {
          title: this.data.fields.image.title,
          file: {
            url: this.data.fields.image.file.url,
            fileName: this.data.fields.image.file.fileName,
            contentType: this.data.fields.image.file.contentType
          }
        }
      }
    },

    launchFilePicker(){
      this.$refs.file.click();
    },

    onFileChange(fieldName, file) {
      const { maxSize } = this
      let imageFile = file[0] 

      //check if user actually selected a file
      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize
        if (!imageFile.type.match('image.*')) {
          // check whether the upload is an image
          this.errorDialog = true
          this.errorText = 'Please choose an image file'
        } else if (size > 4) {
          // check whether the size is greater than the size limit
          this.errorDialog = true
          this.errorText = 'Your file is too big! Please select an image under 1MB'
        } else {
          const reader  = new FileReader()

          console.log(imageFile);

          reader.onload = (e) => {
            this.formData.image.file.url = e.target.result
            this.formData.image.file.fileName = imageFile.name
            this.formData.image.file.contentType = imageFile.type;
          };
          reader.readAsDataURL(file[0])
          this.imageUpdated = true
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../../../node_modules/sass-rem/rem';
  @import '~assets/css/utilities/variables.scss';

  .last-saved p {
    font-size: rem(12px);
  }

  .dropbox {
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

      .text-container {
        text-align: center;

        .icon {
          width: 40px;
          height: 40px;

          .fa-stack {
            justify-content: center;
            align-items: center;
            display: flex;

            .fa-stack-2x {
              font-size: rem(40px);
            }
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
  }
</style>
