<template lang="pug">
  section.hero.is-success.is-fullheight(v-cloak)
   .hero-body
    .container.has-text-centered
      .column.is-4.is-offset-4
        h3.title.has-text-grey Login
        p.subtitle.has-text-grey Please login to proceed.
        .box
          form(@submit.prevent="submitForm")
            .field
              .control
                input.input.is-large(type="email" placeholder="Your Email" autofocus="")
            .field
              .control
                input.input.is-large(type="password" placeholder="Your Password")
            button.button.is-block.is-info.is-large.is-fullwidth Login
</template>

<script>
  // import HeaderHomepage from '@/components/Headers/HeaderHomepage.vue'

  export default {
    components: {
    },

    async fetch ({ store }) {
    },

    mounted () {
      // if (!process.client) return

      // return this.$store.dispatch('homepage/fetchData')
    },

    computed: {
      homepage () {
        return this.$store.getters['homepage/getData']
      }
    },

    methods: {
      submitForm () {
        console.log("submit form");
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero.is-success {
    background: #F2F6FA;
  }

  .box {
    margin-top: 5rem;
  }

  input {
    font-weight: 300;
  }

  p {
    font-weight: 700;
  }

  p.subtitle {
    padding-top: 1rem;
  }
</style>
