import moment from 'moment'
import api from '@/api/contentful'
import SavePublishButtons from '@/components/Forms/Buttons/SavePublishButtons'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },

    entryId: {
      type: String,
      required: true
    }
  },

  components: {
    SavePublishButtons
  },

  data () {
    return {
      metadata: {
        version: this.data.metadata.version,
        publishedVersion: this.data.metadata.publishedVersion,
        updatedAt: this.data.metadata.updatedAt
      },
      isPublishable: false,
      saveIsLoading: false,
      publishIsLoading: false,
      isSaving: false
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
    saveForm (publish) {
      const token = this.$store.getters['auth/getToken']
      const formData = this.formData
      let myApi
      let imageData
      
      publish ? this.publishIsLoading = true : this.saveIsLoading = true
      this.isSaving = true

      if (this.isAsset) {
        imageData = this.formData.image
        myApi = api.createAsset(token, imageData, publish, this.entryId)
      } else {
        myApi = api.updateData(token, formData, publish, this.entryId)
      }
        
      myApi
        .then(res => {
          this.metadata.version = res.data.metadata.version
          this.metadata.publishedVersion = res.data.metadata.publishedVersion
          this.metadata.updatedAt = res.data.metadata.updatedAt
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
          console.log(err)
          publish ? this.publishIsLoading = false : this.saveIsLoading = false
          this.isSaving = false
        })
    },

    isReadyToPublish () {
      const version = this.metadata.version
      const publishedVersion = this.metadata.publishedVersion

      if (version > publishedVersion + 1)  {
        this.isPublishable = true
      } else {
        this.isPublishable = false
      }
    }
  }
}