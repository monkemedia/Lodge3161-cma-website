<template lang="pug">
  main.main
    left-menu-blog
    section.section
      .container.is-fluid
        .columns
          .column
            header.header
              h1.h1 Create blog post
            section
              CreateBlogPostForm(:data="formData" update)
</template>

<script>
  import { lang } from '@/utils'
  import api from '@/api/blog'
  import LeftMenuBlog from '@/components/Menu/LeftMenuBlog'
  import CreateBlogPostForm from '@/components/Forms/CreateBlogPost'

  export default {
    layout: 'loggedIn',

    middleware: [
      'isAuthenticated'
    ],

    components: {
      LeftMenuBlog,
      CreateBlogPostForm
    },

    async asyncData ({ store, params, query, error }) {
      const token = store.getters['auth/getToken']
      const entryId = params.id
      let id
      let isAsset = false
      let fetchImage
      let mediaData

      if (entryId === undefined) { 
        return error({ statusCode: 404, message: 'Sadly this page cannot be found.' })
      }

      try {
        const fetchData = await api.fetchData(token, entryId, isAsset)

        if (fetchData.data.fields.image && fetchData.data.fields.image[lang].sys.linkType === 'Asset') {
          id = fetchData.data.fields.image[lang].sys.id
          isAsset = true
          fetchImage = await api.fetchData(token, id, isAsset)
          mediaData = { ...fetchImage.data }
        }

        return {
          formData: {
            ...fetchData.data,
            media: mediaData
          }
        }
      } catch (err) {
        return error({ statusCode: 500, message: 'Something went wrong.' })
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

</style>
