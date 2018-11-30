import moment from 'moment'
import SavePublishButtons from '@/components/Forms/Buttons/SavePublishButtons'

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
