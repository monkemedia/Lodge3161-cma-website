<template lang="pug">
  form
    .dropbox(@click="launchFilePicker()" :class="{ 'disabled' : isSaving }")
      .dropbox__inner
        figure(v-if="formData.image.file.url")
          img(:src="formData.image.file.url")
        .text-container(v-if="!formData.image.file.url")
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
          v-validate="'required'"
          @change="onFileChange($event.target.name, $event.target.files[0])" 
          accept="image/*")
        a.dropbox__upload-hover(v-if="formData.image.file.url")
          span.icon
            .fa-stack
              i.fas.fa-cloud-upload-alt.dropbox__upload-hover__icon
              i.fas.fa-circle.fa-stack-2x.dropbox__upload-hover__background

    input-field(
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.image.title"
      :disabled="isSaving"
      :errorText="errors.first('title')"
    )

    save-publish-buttons(
      :isPublish="isPublish"
      :isFormDirty="isFormDirty"
      :saveIsLoading="saveIsLoading"
      :publishIsLoading="publishIsLoading"
      :anyFormErrors="errors.items.length <= 0"
      @click="saveAsset"
    )

    .last-saved.has-text-right
      p Last saved {{ lastSaved }}
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import mixin from '@/plugins/mixins/common-api-functionality'
  import api from '@/api/contentful'
  import { lang } from '@/utils/index'

  Vue.use(VeeValidate)

  export default {
    mixins: [mixin],

    data () {
      return {
        formData: {
          image: {
            title: this.data.fields.title[lang()],
            file: {
              url: this.data.fields.file[lang()].url,
              fileName: this.data.fields.file[lang()].fileName,
              contentType: this.data.fields.file[lang()].contentType
            }
          }
        }
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
          this.formData.image.file.url = e.target.result
          this.formData.image.file.fileName = imageFile.name
          this.formData.image.file.contentType = imageFile.type
        }
        reader.readAsDataURL(imageFile)
        this.imageUpdated = true
      },

      saveAsset (publish) {
        const token = this.$store.getters['auth/getToken']
        const imageData = this.formData.image
        const entryIdMedia = 'pEJywsuGxam0K8kqmsKa0'

        this.$validator.validateAll()
          .then(() => {
            publish ? this.publishIsLoading = true : this.saveIsLoading = true
            this.isSaving = true

            api.createAsset(token, imageData, entryIdMedia, publish)
              .then(res => {
                this.metadata.version = res.data.data.metadata.version
                this.metadata.publishedVersion = res.data.data.metadata.publishedVersion
                this.metadata.updatedAt = res.data.data.metadata.updatedAt
                this.$validator.reset();
                this.isReadyToPublish()
                this.isSaving = false
                
                if (publish) {
                  this.publishIsLoading = false
                  this.$toast.open({
                    message: 'These changes are now live',
                    type: 'is-success',
                    duration: 5000,
                    position: 'is-bottom-right',
                    actionText: null
                  })
                } else {
                  this.saveIsLoading = false
                }
              })
              .catch(err => {
                console.log(err.message)
                this.isSaving = false
                this.$validator.reset();
                publish ? this.publishIsLoading = false : this.saveIsLoading = false
              })
          })
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

          .fa-stack-2x {
            font-size: rem(40px);
          }
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
