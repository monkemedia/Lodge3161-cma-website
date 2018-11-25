<template lang="pug">
  form
    input-field(
      label="Title"
      name="title"
      placeholder=""
      v-validate="'required'"
      v-model="formData.title"
      :disabled="isSaving"
      :errorText="errors.first('title')"
    )
    input-field(
      label="Subtitle"
      name="subtitle"
      placeholder=""
      v-validate="'required'"
      v-model="formData.subtitle"
      :disabled="isSaving"
      :errorText="errors.first('subtitle')"
    )

    save-publish-buttons(
      :isPublish="isPublish"
      :isFormDirty="isFormDirty"
      :saveIsLoading="saveIsLoading"
      :publishIsLoading="publishIsLoading"
      @click="saveForm"
    )

    .last-saved.has-text-right
      p Last saved {{ lastSaved }}
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import api from '@/api/homepage/hero/media'
  import moment from 'moment'
  import SavePublishButtons from '@/components/Forms/Buttons/SavePublishButtons'

  Vue.use(VeeValidate)

  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },

    components: {
      SavePublishButtons
    },

    data () {
      return {
        formData: {
          image: {
            title: this.data.fields.title,
            version: this.data.fields.image.version,
            file: {
              url: this.data.fields.image.file.url,
              fileName: this.data.fields.image.file.fileName,
              contentType: this.data.fields.image.file.contentType
            }
          }
        },
        metadata: {
          version: this.data.metadata.version,
          publishedVersion: this.data.metadata.publishedVersion,
          updatedAt: this.data.metadata.updatedAt
        },
        isPublishable: false,
        saveIsLoading: false,
        publishIsLoading: false,
        isSaving: false,
        imageUpdated: false
      }
    },

    mounted() {
      this.isReadyToPublish()
    },

    computed: {
      isFormDirty () {
        return Object.keys(this.fields).some(key => this.fields[key].dirty);
      },

      isPublish () {
        if (this.isPublishable === false) {
          return false
        } else if (this.isPublishable === true) {
          return true
        } 
      },

      lastSaved () {
        return moment(this.metadata.updatedAt).fromNow();
      }
    },

    methods: {
      isReadyToPublish () {
        const version = this.metadata.version
        const publishedVersion = this.metadata.publishedVersion

        if (version > publishedVersion + 1)  {
          this.isPublishable = true
        } else {
          this.isPublishable = false
        }
      },

      saveForm (publish) {
        const token = this.$store.getters['auth/getToken']
        const formData = this.formData
        const version = this.formData.image.version

        publish ? this.publishIsLoading = true : this.saveIsLoading = true
        this.isSaving = true

        api.updateData(token, formData, publish, version)
          .then(res => {
            this.metadata.version = res.data.metadata.version
            this.metadata.publishedVersion = res.data.metadata.publishedVersion
            this.$validator.reset();
            this.isReadyToPublish()
            this.isSaving = false
            publish ? this.publishIsLoading = false : this.saveIsLoading = false
          })
          .catch(err => {
            console.log('something went wrong :( ', err);
            this.isSaving = false
            publish ? this.publishIsLoading = false : this.saveIsLoading = false
          })
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
