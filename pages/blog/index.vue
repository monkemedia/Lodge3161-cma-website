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
              CreateBlogPostForm
</template>

<script>
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
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/utilities/variables.scss';
  @import '~assets/css/utilities/mixins.scss';

</style>
